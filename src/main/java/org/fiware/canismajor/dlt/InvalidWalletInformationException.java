package org.fiware.canismajor.dlt;

public class InvalidWalletInformationException extends Exception {

	public InvalidWalletInformationException(String message) {
		super(message);
	}

	public InvalidWalletInformationException(String message, Throwable cause) {
		super(message, cause);
	}
}
