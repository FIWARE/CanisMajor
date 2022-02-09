package it.pojo;

import lombok.Data;

@Data
public class VaultPlugin {
	//default values correspond to the plugin in the vault-test image
	private String sha256 = "c79840dde4d533698f30c0c41cafc9839e13c339775c0af2b708d6d02d3ae0b7";
	private String command = "vault-ethereum --tls-skip-verify=true";
}
