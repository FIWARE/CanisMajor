package org.fiware.canismajor.exception;

public class TokenException extends Exception {
	public TokenException(String message) {
		super(message);
	}

	public TokenException(String message, Throwable cause) {
		super(message, cause);
	}
}
