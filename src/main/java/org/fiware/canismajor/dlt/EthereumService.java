package org.fiware.canismajor.dlt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.aeicontract.Assets;
import org.fiware.canismajor.configuration.EthereumProperties;
import org.fiware.canismajor.configuration.MerkleProperties;
import org.fiware.canismajor.exception.SigningException;
import org.fiware.canismajor.exception.TransactionException;
import org.fiware.canismajor.mapping.TransactionMapper;
import org.fiware.canismajor.model.EntityFragmentVO;
import org.fiware.canismajor.model.EntityVO;
import org.rebaze.integrity.tree.Tree;
import org.rebaze.integrity.tree.TreeSession;
import org.rebaze.integrity.tree.util.DefaultTreeSessionFactory;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.utils.Numeric;

import javax.inject.Singleton;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class EthereumService {

	private final Web3j ethClient;
	private final ObjectMapper objectMapper;
	private final TransactionMapper transactionMapper;
	private final ContractGasProvider contractGasProvider;
	private final EthereumProperties ethereumProperties;
	private final MerkleProperties merkleProperties;
	private final SigningServiceFactory signingServiceFactory;

	public boolean isAddress(String publicKey) {
		return WalletUtils.isValidAddress(publicKey);
	}

	public Credentials toAccount(String privateKey) {
		return Credentials.create(ECKeyPair.create(Numeric.hexStringToByteArray(privateKey)));
	}

	public TransactionReceipt createAsset(EntityVO entityVO, WalletInformation walletInformation) throws TransactionException {
		try {
			Assets assets = Assets.load(ethereumProperties.getContractAddress(), ethClient, getSigningTransactionManager(walletInformation), contractGasProvider);

			RemoteFunctionCall<TransactionReceipt> txRFC = assets.createAsset(getAssetId(entityVO.id()), getMerkleTreeHash(entityVO));
			return txRFC.send();
		} catch (JsonProcessingException e) {
			throw new TransactionException(String.format("Was not able to create the merkle root hash for entity %s.", entityVO), e);
		} catch (Exception e) {
			throw new TransactionException(String.format("Was not able to send transaction for entity %s.", entityVO), e);
		}
	}

	public TransactionReceipt updateAsset(URI entityId, EntityFragmentVO entityFragmentVO, WalletInformation walletInformation) throws TransactionException {
		try {
			Assets assets = Assets.load(ethereumProperties.getContractAddress(), ethClient, getSigningTransactionManager(walletInformation), contractGasProvider);
			RemoteFunctionCall<TransactionReceipt> txRFC = assets.updateAsset(getAssetId(entityId), getMerkleTreeHash(entityFragmentVO));
			return txRFC.send();
		} catch (JsonProcessingException e) {
			throw new TransactionException(String.format("Was not able to create the merkle root hash for entity fragment %s.", entityFragmentVO), e);
		} catch (Exception e) {
			throw new TransactionException(String.format("Was not able to send transaction for entity fragment %s.", entityFragmentVO), e);
		}
	}

	private byte[] getAssetId(URI entityId) {
		byte[] idArray = entityId.toString().getBytes();
		return Arrays.copyOf(idArray, 32);
	}

	private String getMerkleTreeHash(Object object) throws JsonProcessingException {
		String entityString = objectMapper.writeValueAsString(object);
		TreeSession treeSession = new DefaultTreeSessionFactory().create();
		treeSession.setDigestAlgorithm(merkleProperties.getHashMethod());
		Tree entityTree = treeSession.createTreeBuilder().add(entityString.getBytes()).seal();
		return entityTree.fingerprint();
	}


	public TransactionManager getSigningTransactionManager(WalletInformation walletInformation) {
		return new SigningTransactionManager(transactionMapper, objectMapper, signingServiceFactory.createSigningService(walletInformation), ethClient);
	}

}
