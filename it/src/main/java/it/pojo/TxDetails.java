package it.pojo;

import lombok.Data;

// This class encapsulates essential information about a blockchain transaction.
@Data
public class TxDetails {

	private String transactionHash;
	private String blockHash;
	private String status;
	private String from;
	private String to;
}
