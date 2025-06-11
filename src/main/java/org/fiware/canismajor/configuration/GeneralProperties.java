package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

// This class holds configuration for general properties
@ConfigurationProperties("general")
@Data
public class GeneralProperties {

	private String ngsiTenant;

}
