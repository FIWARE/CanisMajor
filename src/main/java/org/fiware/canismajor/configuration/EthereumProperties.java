package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

import java.math.BigInteger;
import java.net.URL;

@ConfigurationProperties("ethereum")
@Data
public class EthereumProperties {

	private boolean enabled;
	private URL dltAddress;
	private String contractAddress;
	private BigInteger gas;
	private BigInteger gasPrice;
}
