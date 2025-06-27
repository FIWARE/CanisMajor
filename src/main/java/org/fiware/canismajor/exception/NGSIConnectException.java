package org.fiware.canismajor.exception;

// This class is used to throw exceptions related to NGSI connection
public class NGSIConnectException extends Exception {
	public NGSIConnectException(String message) {
		super(message);
	}

	public NGSIConnectException(String message, Throwable cause) {
		super(message, cause);
	}
}
