package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

@ConfigurationProperties("merkle")
@Data
public class MerkleProperties {

	/**
	 * Hash method. Needs to be supported by {@link  java.security.MessageDigest}
	 */
	private String hashMethod = "SHA-256";
}
