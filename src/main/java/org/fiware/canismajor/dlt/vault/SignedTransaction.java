package org.fiware.canismajor.dlt.vault;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SignedTransaction {

	private String amount;
	private String from;

	@JsonProperty("gas_limit")
	private String gasLimit;
	@JsonProperty("gas_price")
	private String gasPrice;

	private String nonce;

	@JsonProperty("signed_transaction")
	private String signedTransaction;

	private String to;
	
	@JsonProperty("transaction_hash")
	private String transactionHash;

}
