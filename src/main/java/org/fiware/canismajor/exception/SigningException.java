package org.fiware.canismajor.exception;

// This class is used to throw exceptions related to signing operations
public class SigningException extends RuntimeException {

	public SigningException(String message) {
		super(message);
	}

	public SigningException(String message, Throwable cause) {
		super(message, cause);
	}
}
