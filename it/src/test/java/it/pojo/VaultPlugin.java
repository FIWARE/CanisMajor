package it.pojo;

import lombok.Data;

@Data
public class VaultPlugin {
	//default values correspond to the plugin in the vault-test image
	private String sha256 = "736eaa8f1fbc4bba0eac8a4b1761df036abd337bcd773e7d6ec7c5940ffb0210";
	private String command = "vault-ethereum --tls-skip-verify=true";
}
