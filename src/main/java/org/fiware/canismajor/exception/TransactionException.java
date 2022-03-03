package org.fiware.canismajor.exception;

public class TransactionException extends Exception{
	public TransactionException(String message) {
		super(message);
	}

	public TransactionException(String message, Throwable cause) {
		super(message, cause);
	}
}
