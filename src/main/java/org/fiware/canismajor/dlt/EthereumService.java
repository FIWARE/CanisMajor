package org.fiware.canismajor.dlt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.aeicontract.Timestamper;
import org.fiware.canismajor.configuration.DefaultAccountProperties;
import org.fiware.canismajor.configuration.EthereumProperties;
import org.fiware.canismajor.exception.SigningException;
import org.fiware.canismajor.exception.TransactionException;
import org.fiware.canismajor.mapping.TransactionMapper;
import org.fiware.canismajor.model.EntityFragmentVO;
import org.fiware.canismajor.model.EntityVO;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Hash;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.utils.Numeric;

import javax.inject.Singleton;
import java.math.BigInteger;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class EthereumService {

	private final Web3j ethClient;
	private final ObjectMapper objectMapper;
	private final TransactionMapper transactionMapper;
	private final ContractGasProvider contractGasProvider;
	private final EthereumProperties ethereumProperties;
	private final SigningServiceFactory signingServiceFactory;
	private final DefaultAccountProperties defaultAccountProperties;

	public TransactionReceipt persistEntityCreation(EntityVO entityVO, WalletInformation walletInformation) throws TransactionException {
		try {
			Timestamper timestamper = Timestamper.load(ethereumProperties.getContractAddress(), ethClient, getSigningTransactionManager(walletInformation), contractGasProvider);
			RemoteFunctionCall<TransactionReceipt> txRFC = timestamper.timestamp(getAssetId(entityVO.id()), getMerkleTreeHash(entityVO));
			return txRFC.send();
		} catch (JsonProcessingException e) {
			throw new TransactionException(String.format("Was not able to create the merkle root hash for entity %s.", entityVO), e);
		} catch (Exception e) {
			throw new TransactionException(String.format("Was not able to send transaction for entity %s.", entityVO), e);
		}
	}

	public TransactionReceipt persistEntityUpdate(URI entityId, EntityFragmentVO entityFragmentVO, WalletInformation walletInformation) throws TransactionException {
		try {
			Timestamper timestamper = Timestamper.load(ethereumProperties.getContractAddress(), ethClient, getSigningTransactionManager(walletInformation), contractGasProvider);
			RemoteFunctionCall<TransactionReceipt> txRFC = timestamper.timestamp(getAssetId(entityId), getMerkleTreeHash(entityFragmentVO));
			return txRFC.send();
		} catch (JsonProcessingException e) {
			throw new TransactionException(String.format("Was not able to create the merkle root hash for entity fragment %s.", entityFragmentVO), e);
		} catch (Exception e) {
			throw new TransactionException(String.format("Was not able to send transaction for entity fragment %s.", entityFragmentVO), e);
		}
	}

	public TransactionReceipt persistBatchOperation(List<EntityVO> entities, WalletInformation walletInformation) throws TransactionException {
		try {
			Timestamper timestamper = Timestamper.load(ethereumProperties.getContractAddress(), ethClient, getSigningTransactionManager(walletInformation), contractGasProvider);
			// we generate a random uuid to connect the update to, since we do not want to create multiple transactions for one update
			RemoteFunctionCall<TransactionReceipt> txRFC = timestamper.timestamp(getAssetId(URI.create(UUID.randomUUID().toString())), getMerkleTreeHash(entities));
			return txRFC.send();
		} catch (JsonProcessingException e) {
			throw new TransactionException(String.format("Was not able to create the merkle root hash for entity list %s.", entities), e);
		} catch (Exception e) {
			throw new TransactionException(String.format("Was not able to send transaction for for entity list %s.", entities), e);
		}
	}

	private BigInteger getAssetId(URI entityId) {
		return Numeric.toBigInt(Hash.sha3String(entityId.toString()));
	}

	private BigInteger getMerkleTreeHash(Object object) throws JsonProcessingException {
		// sort to get a reproducible hash
		objectMapper.configure(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY, true);
		String entityString = objectMapper.writeValueAsString(object);

		return Numeric.toBigInt(Hash.sha3String(entityString));
	}


	public TransactionManager getSigningTransactionManager(WalletInformation walletInformation) {
		switch (walletInformation.walletType()) {
			case VAULT -> {
				return new SigningTransactionManager(transactionMapper, objectMapper, signingServiceFactory.createSigningService(walletInformation), ethClient);
			}
			case DEFAULT -> {
				if(!defaultAccountProperties.isEnabled()) {
					throw new SigningException("Signing with a default account is not enabled. Please provide wallet-information or contact the administrator.");
				}
				log.warn("Transaction will be signed with the default account. This is not recommended, since it might impose a security risk.");
				return new RawTransactionManager(ethClient, Credentials.create(defaultAccountProperties.getPrivateKey()));
			} default -> throw new SigningException(String.format("Did not receive valid wallet-information. Type is: %s", walletInformation.walletType()));
		}
	}
}
