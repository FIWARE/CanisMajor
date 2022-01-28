package org.fiware.canismajor.exception;

public class NGSIConnectException extends Exception {
	public NGSIConnectException(String message) {
		super(message);
	}

	public NGSIConnectException(String message, Throwable cause) {
		super(message, cause);
	}
}
