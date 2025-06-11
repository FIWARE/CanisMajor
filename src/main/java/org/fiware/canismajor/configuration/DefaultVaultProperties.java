package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

import java.net.URL;

// This class holds configuration for enabling and supplying a default vault account 
@ConfigurationProperties("defaultVaultAccount")
@Data
public class DefaultVaultProperties {

	private boolean enabled = false;
	private String username;
	private String token;
	private URL vaultAddress;
}
