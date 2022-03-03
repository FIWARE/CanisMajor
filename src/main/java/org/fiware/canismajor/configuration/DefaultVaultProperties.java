package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

import java.net.URL;

@ConfigurationProperties("defaultVaultAccount")
@Data
public class DefaultVaultProperties {

	private boolean enabled = false;
	private String username;
	private String token;
	private URL vaultAddress;
}
