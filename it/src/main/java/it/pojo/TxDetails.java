package it.pojo;

import lombok.Data;

// only stuff that we are interested in for the tests
@Data
public class TxDetails {

	private String transactionHash;
	private String blockHash;
	private String status;
	private String from;
	private String to;
}
