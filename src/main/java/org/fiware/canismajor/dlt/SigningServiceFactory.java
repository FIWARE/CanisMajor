package org.fiware.canismajor.dlt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.micronaut.http.client.BlockingHttpClient;
import lombok.RequiredArgsConstructor;
import org.fiware.canismajor.dlt.vault.VaultBackedSigningService;
import org.fiware.canismajor.exception.SigningException;

import javax.inject.Singleton;

@Singleton
@RequiredArgsConstructor
public class SigningServiceFactory {

	private final BlockingHttpClient blockingHttpClient;
	private final ObjectMapper objectMapper;

	public SigningService createSigningService(WalletInformation walletInformation) {
		switch (walletInformation.walletType()) {
			case VAULT -> {
				try {
					return new VaultBackedSigningService(blockingHttpClient, objectMapper, walletInformation);
				} catch (InvalidWalletInformationException e) {
					throw new SigningException("Did not receive valid signing information.", e);
				}
			}
			default -> throw new SigningException(String.format("Was not able to create SigningService for %s.", walletInformation));
		}
	}
}

