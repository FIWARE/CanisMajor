package org.fiware.canismajor.dlt.vault;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.micronaut.http.HttpMethod;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.BlockingHttpClient;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.dlt.InvalidWalletInformationException;
import org.fiware.canismajor.dlt.SigningService;
import org.fiware.canismajor.dlt.WalletInformation;
import org.fiware.canismajor.dlt.WalletType;
import org.fiware.canismajor.exception.SigningException;
import org.fiware.canismajor.exception.VaultException;

import java.util.Optional;

@Slf4j
public class VaultBackedSigningService extends SigningService {

	private final BlockingHttpClient blockingHttpClient;
	private final ObjectMapper objectMapper;
	private static final String X_VAULT_TOKEN_HEADER_NAME = "X-Vault-Token";

	public VaultBackedSigningService(BlockingHttpClient blockingHttpClient, ObjectMapper objectMapper, WalletInformation walletInformation) throws InvalidWalletInformationException {
		super(walletInformation);
		this.blockingHttpClient = blockingHttpClient;
		this.objectMapper = objectMapper;
	}

	@Override
	public void validateWalletInformation() throws InvalidWalletInformationException {
		if (walletInformation.walletType() != WalletType.VAULT) {
			throw new InvalidWalletInformationException(String.format("Wallet type %s not supported.", walletInformation.walletType()));
		}
		if (walletInformation.walletAddress().isEmpty()) {
			throw new InvalidWalletInformationException("Wallet type vault requires a valid address to vault.");
		}
		if (walletInformation.walletToken().isEmpty()) {
			throw new InvalidWalletInformationException("Wallet type vault requires a token to commiunicate with vault.");
		}
	}

	@Override
	public String getAccountAddress() {
		HttpRequest<Object> addressRequest = HttpRequest.create(HttpMethod.GET, walletInformation.walletAddress().get().toString()).header(X_VAULT_TOKEN_HEADER_NAME, walletInformation.walletToken().get());
		try {
			HttpResponse<VaultResponse> addressResponse = blockingHttpClient.exchange(addressRequest, VaultResponse.class);
			if (!addressResponse.getStatus().equals(HttpStatus.OK) || addressResponse.getBody().isEmpty()) {
				throw new VaultException(String.format("Was not able to retrieve the public address from vault. Response: %s: %s", addressResponse.getStatus(), addressResponse.getBody()));
			}
			return Optional.ofNullable(addressResponse.getBody().get().getData())
					.map(data -> objectMapper.convertValue(data, AddressData.class))
					.map(AddressData::getAddress)
					.orElseThrow(() -> new VaultException("No address was present in the response."));
		} catch (HttpClientResponseException e) {
			throw new VaultException("Was not able to get the address from vault.", e);
		}
	}

	@Override
	public String signTransaction(String transaction) {
		HttpRequest<Object> signingRequest = HttpRequest.create(HttpMethod.POST, walletInformation.walletAddress().get() + "/sign-tx").header(X_VAULT_TOKEN_HEADER_NAME, walletInformation.walletToken().get()).body(transaction);
		try {
			HttpResponse<VaultResponse> signingResponse = blockingHttpClient.exchange(signingRequest, VaultResponse.class);
			if (!signingResponse.getStatus().equals(HttpStatus.OK) || signingResponse.getBody().isEmpty()) {
				throw new SigningException(
						String.format("Was not able to sign transaction at vault. Status was: %s",
								signingResponse.getStatus()));
			}
			return Optional.ofNullable(signingResponse.getBody().get().getData())
					.map(data -> objectMapper.convertValue(data, SignedTransaction.class))
					.map(SignedTransaction::getSignedTransaction)
					.orElseThrow(() -> new SigningException("Empty data received instead of a signed transaction."));
		} catch (HttpClientResponseException e) {
			throw new SigningException("Was not able to sign transaction at vault.", e);
		}
	}
}
