package org.fiware.canismajor.token;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.configuration.EncryptionProperties;
import org.fiware.canismajor.exception.TokenException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.inject.Singleton;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class TokenService {

	private static final String DLT_TOKEN_TEMPLATE = "%s:%s";
	private final EncryptionProperties encryptionProperties;

	public String generateToken(String privateKey, String publicKey) throws TokenException {
		String concatenatedKey = String.format(DLT_TOKEN_TEMPLATE, publicKey, privateKey);
		return encrypt(getInitializedCipher(Cipher.ENCRYPT_MODE, generateIv()), concatenatedKey);
	}

	public DLTToken decryptToken(String encryptedToken) throws TokenException {

		byte[] encryptedArray = Base64.getDecoder().decode(encryptedToken);

		byte[] ivArray = Arrays.copyOfRange(encryptedArray, 0, 16);
		byte[] cipherArray = Arrays.copyOfRange(encryptedArray, 16, encryptedArray.length);
		String decryptedString = decrypt(getInitializedCipher(Cipher.DECRYPT_MODE, new IvParameterSpec(ivArray)), cipherArray);
		log.info(decryptedString);
		String[] keyArray = decryptedString.split(":");
		return new DLTToken(keyArray[0], keyArray[1]);

	}

	private Cipher getInitializedCipher(int cipherMode, IvParameterSpec ivParameterSpec) throws TokenException {
		try {
			Cipher cipher = Cipher.getInstance(encryptionProperties.getAlgorithm());
			Key key = getKeyFromPassword(encryptionProperties.getCmSecret(), encryptionProperties.getSalt(), encryptionProperties.getKeyType());
			cipher.init(cipherMode, key, ivParameterSpec);
			return cipher;
		} catch (NoSuchPaddingException e) {
			throw new TokenException(String.format("Configured padding does not exist: %s", encryptionProperties.getAlgorithm()), e);
		} catch (InvalidKeyException e) {
			throw new TokenException(String.format("Configured key is invalid: %s - %s", encryptionProperties.getKeyType(), encryptionProperties.getCmSecret()), e);
		} catch (NoSuchAlgorithmException e) {
			throw new TokenException("Configured algorithm does not exist.", e);
		} catch (InvalidAlgorithmParameterException e) {
			throw new TokenException("Invalid IV.", e);
		}
	}

	private static String encrypt(Cipher cipher, String input) throws TokenException {
		try {
			byte[] cipherText = cipher.doFinal(input.getBytes());
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			byteArrayOutputStream.write(cipher.getIV());
			byteArrayOutputStream.write(cipherText);

			return Base64.getEncoder()
					.encodeToString(byteArrayOutputStream.toByteArray());
		} catch (IllegalBlockSizeException e) {
			throw new TokenException("Invalid blocksize for decryption.", e);
		} catch (BadPaddingException e) {
			throw new TokenException("Invalid padding for decryption.", e);
		} catch (IOException e) {
			throw new TokenException("Was not able to construct resulting byteArray.", e);
		}
	}

	private static String decrypt(Cipher cipher, byte[] cipherText) throws TokenException {
		try {
			return new String(cipher.doFinal(cipherText));
		} catch (IllegalBlockSizeException e) {
			throw new TokenException("Invalid blocksize for decryption.", e);
		} catch (BadPaddingException e) {
			throw new TokenException("Invalid padding for decryption.", e);
		}
	}


	private static IvParameterSpec generateIv() {
		byte[] iv = new byte[16];
		new SecureRandom().nextBytes(iv);
		return new IvParameterSpec(iv);
	}

	private static SecretKey getKeyFromPassword(String password, String salt, String keyType) throws TokenException {
		try {
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 65536, 256);
			return new SecretKeySpec(factory.generateSecret(spec)
					.getEncoded(), keyType);
		} catch (NoSuchAlgorithmException e) {
			throw new TokenException("Configured algorithm does not exist.", e);
		} catch (InvalidKeySpecException e) {
			throw new TokenException("Invalid spec for the key.", e);
		}
	}
}
