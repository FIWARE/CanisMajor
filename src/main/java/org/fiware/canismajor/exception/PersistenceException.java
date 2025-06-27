package org.fiware.canismajor.exception;

// This class is used to throw exceptions related to persistence operations
public class PersistenceException extends RuntimeException {
	public PersistenceException(String message) {
		super(message);
	}

	public PersistenceException(String message, Throwable cause) {
		super(message, cause);
	}
}
