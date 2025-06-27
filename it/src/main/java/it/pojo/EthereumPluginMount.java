package it.pojo;

import lombok.Data;

/* This class represents the configuration for mounting an Ethereum plugin.
It encapsulates the type of plugin being mounted, which defaults to "vault-ethereum*/
@Data
public class EthereumPluginMount {
	private String type = "vault-ethereum";
}
