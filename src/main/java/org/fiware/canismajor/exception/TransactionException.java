package org.fiware.canismajor.exception;

// This class is used to throw exceptions related to transaction operations
public class TransactionException extends Exception{
	public TransactionException(String message) {
		super(message);
	}

	public TransactionException(String message, Throwable cause) {
		super(message, cause);
	}
}
