package org.fiware.canismajor.dlt;

public abstract class SigningService {

	protected final WalletInformation walletInformation;

	protected SigningService(WalletInformation walletInformation) throws InvalidWalletInformationException {
		this.walletInformation = walletInformation;
		validateWalletInformation();
	}

	public abstract void validateWalletInformation() throws InvalidWalletInformationException;

	public abstract String getAccountAddress();

	public abstract String signTransaction(String transaction);
}
