package org.fiware.canismajor.dlt.vault;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Representation of a transaction in vault.
 */
@Data
public class VaultTransaction {

	private String name;
	private String address;
	private String to;
	private String encoding = "hex";
	private String amount;
	private String nonce;
	@JsonProperty("gas_limit")
	private String gasLimit;
	@JsonProperty("gas_price")
	private String gasPrice;

	private String data;
}


