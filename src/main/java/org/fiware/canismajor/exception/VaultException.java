package org.fiware.canismajor.exception;

// This class holds exceptions related to vault operations
public class VaultException extends RuntimeException {

	public VaultException(String message) {
		super(message);
	}

	public VaultException(String message, Throwable cause) {
		super(message, cause);
	}
}
