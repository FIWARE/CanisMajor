package org.fiware.canismajor.token;

import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.configuration.EncryptionProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@Slf4j
class TokenServiceTest {

	private TokenService tokenService;
	private EncryptionProperties encryptionProperties;

	private String privateKey = "0x6e8f202ae50d774850d0678fb83a730e501ada8d2a6cda5851cdb42b27a4f45b";
	private String publicKey = "0x3423f4d100f8646aaf6829ce32cf801996f7007b";

	@BeforeEach
	public void setup() {
		encryptionProperties = mock(EncryptionProperties.class);
		tokenService = new TokenService(encryptionProperties);
	}

	@Test
	public void signMessage() throws Exception {
		String myMessage = "myMessage";
		ECKeyPair ecKeyPair = ECKeyPair.create(Numeric.hexStringToByteArray(privateKey));
		assertDoesNotThrow(() -> Sign.signMessage(myMessage.getBytes(), ecKeyPair));
	}


	@DisplayName("Decrypting a generated token should lead to the same key-combination.")
	@Test
	public void encDecToken_success() throws Exception {
		when(encryptionProperties.getAlgorithm()).thenReturn("AES/CTR/NoPadding");
		when(encryptionProperties.getCmSecret()).thenReturn("secret_key");
		when(encryptionProperties.getSalt()).thenReturn("my_salt");
		when(encryptionProperties.getKeyType()).thenReturn("AES");


		String dltTokenString = tokenService.generateToken(privateKey, publicKey);

		assertFalse(dltTokenString.isEmpty(), "A token should have been returend.");
		DLTToken dltToken = tokenService.decryptToken(dltTokenString);
		assertEquals(privateKey, dltToken.privateKey());
		assertEquals(publicKey, dltToken.publicKey());
	}


}