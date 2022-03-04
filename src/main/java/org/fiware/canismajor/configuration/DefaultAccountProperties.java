package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

@ConfigurationProperties("defaultAccount")
@Data
public class DefaultAccountProperties {

	/**
	 * Usage of a default account is enabled. Be aware that this might impose a security risk, since the private key has to be made available to canis-major.
	 * Its HIGHLY recommended to delegate signing to an external signing endpoint in the domain of the requester.
	 */
	private boolean enabled = false;
	private String privateKey;
}
