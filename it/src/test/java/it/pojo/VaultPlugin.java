package it.pojo;

import lombok.Data;

@Data
public class VaultPlugin {
	//default values correspond to the plugin in the vault-test image
	private String sha256 = "76dc18d1811e2086e784414ffdef700854959e85fdfd61f089b138f1e0364aa2";
	private String command = "vault-ethereum --tls-skip-verify=true";
}
