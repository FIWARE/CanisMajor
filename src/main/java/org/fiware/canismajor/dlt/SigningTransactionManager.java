package org.fiware.canismajor.dlt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fiware.canismajor.exception.SigningException;
import org.fiware.canismajor.mapping.TransactionMapper;
import org.web3j.crypto.Hash;
import org.web3j.crypto.RawTransaction;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetCode;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.exceptions.ContractCallException;
import org.web3j.tx.exceptions.TxHashMismatchException;
import org.web3j.utils.TxHashVerifier;

import java.io.IOException;
import java.math.BigInteger;


public class SigningTransactionManager extends TransactionManager {

	private final TransactionMapper transactionMapper;
	private final ObjectMapper objectMapper;
	private final SigningService signingService;
	private final Web3j ethClient;
	private final TxHashVerifier txHashVerifier = new TxHashVerifier();

	public SigningTransactionManager(TransactionMapper transactionMapper, ObjectMapper objectMapper, SigningService signingService, Web3j web3j) {
		super(web3j, signingService.getAccountAddress());
		this.transactionMapper = transactionMapper;
		this.objectMapper = objectMapper;
		this.signingService = signingService;
		this.ethClient = web3j;
	}


	@Override
	public EthSendTransaction sendTransaction(BigInteger gasPrice, BigInteger gasLimit, String to, String data, BigInteger value, boolean constructor) throws IOException {
		BigInteger nonce = getNonce();

		RawTransaction rawTransaction = RawTransaction.createTransaction(nonce, gasPrice, gasLimit, to, value, data);

		return signAndSend(rawTransaction);
	}

	@Override
	public EthSendTransaction sendEIP1559Transaction(long chainId, BigInteger maxPriorityFeePerGas, BigInteger maxFeePerGas, BigInteger gasLimit, String to, String data, BigInteger value, boolean constructor) throws IOException {
		BigInteger nonce = getNonce();

		RawTransaction rawTransaction = RawTransaction.createTransaction(chainId, nonce, gasLimit, to, value, data, maxPriorityFeePerGas, maxFeePerGas);

		return signAndSend(rawTransaction);
	}

	@Override
	public String sendCall(String to, String data, DefaultBlockParameter defaultBlockParameter) throws IOException {
		EthCall ethCall = ethClient.ethCall(Transaction.createEthCallTransaction(getFromAddress(), to, data), defaultBlockParameter).send();

		if (ethCall.isReverted()) {
			throw new ContractCallException(String.format(REVERT_ERR_STR, ethCall.getRevertReason()));
		}
		return ethCall.getValue();
	}

	@Override
	public EthGetCode getCode(String contractAddress, DefaultBlockParameter defaultBlockParameter) throws IOException {

		return ethClient.ethGetCode(contractAddress, defaultBlockParameter).send();
	}

	private BigInteger getNonce() throws IOException {
		EthGetTransactionCount ethGetTransactionCount = ethClient.ethGetTransactionCount(getFromAddress(), DefaultBlockParameterName.PENDING).send();

		return ethGetTransactionCount.getTransactionCount();
	}

	private EthSendTransaction signAndSend(RawTransaction rawTransaction) throws IOException {
		String hexValue = sign(rawTransaction);
		EthSendTransaction ethSendTransaction = ethClient.ethSendRawTransaction(hexValue).send();

		if (ethSendTransaction != null && !ethSendTransaction.hasError()) {
			String txHashLocal = Hash.sha3(hexValue);
			String txHashRemote = ethSendTransaction.getTransactionHash();
			if (!txHashVerifier.verify(txHashLocal, txHashRemote)) {
				throw new TxHashMismatchException(txHashLocal, txHashRemote);
			}
		}
		return ethSendTransaction;
	}

	private String sign(RawTransaction rawTransaction) {
		try {
			return signingService.signTransaction(
					objectMapper.writeValueAsString(
							transactionMapper.rawTransactionToVaultTransaction(rawTransaction)));
		} catch (JsonProcessingException e) {
			throw new SigningException("Was not able to generate a signing request from the transaction.", e);
		}
	}

}
