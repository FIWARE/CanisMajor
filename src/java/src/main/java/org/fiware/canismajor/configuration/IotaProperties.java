package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

@ConfigurationProperties("iota")
@Data
public class IotaProperties {

	private boolean enabled;
	private String nodeUrl = "https://chrysalis-nodes.iota.cafe:443";
	private boolean localPow = true;
	private int requestTimeout = 5;

}
