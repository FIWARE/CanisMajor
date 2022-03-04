package org.fiware.canismajor.dlt;

import lombok.Getter;

public enum WalletType {

	VAULT("Vault"),
	DEFAULT("Default");

	@Getter
	private final String value;

	WalletType(String value) {
		this.value = value;
	}

	public static WalletType getByValue(String value) {
		for (WalletType walletType : values()) {
			if (walletType.value.equalsIgnoreCase(value)) return walletType;
		}
		throw new IllegalArgumentException(String.format("No wallet type %s exists.", value));
	}
}
