package org.fiware.canismajor.exception;

// This class is used to throw exceptions related to account operations
public class AccountException extends RuntimeException {

	public AccountException(String message) {
		super(message);
	}

	public AccountException(String message, Throwable cause) {
		super(message, cause);
	}
}
