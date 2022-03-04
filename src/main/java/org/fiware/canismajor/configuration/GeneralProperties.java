package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

/**
 * Configuration of general properties
 */
@ConfigurationProperties("general")
@Data
public class GeneralProperties {

	private String ngsiTenant;

}
