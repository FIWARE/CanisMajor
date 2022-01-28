package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

import java.math.BigInteger;
import java.net.URL;
import java.util.UUID;

/**
 * Configuration of general properties
 */
@ConfigurationProperties("general")
@Data
public class GeneralProperties {

	private String ngsiTenant;
	private URL dltAddress;
	private String contractAddress;
	private BigInteger gas;
	private BigInteger gasPrice;
}
