package org.fiware.validation_service.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

@Data // Lombok annotation to generate getters and setters
@ConfigurationProperties("general") // Binds to the 'general' prefix in application.yml
public class NgsiConfig {
    private String contextBrokerUrl; // Field for the context broker URL
    private String canisMajorUrl; // Field for the Canis Major URL
    private String ngsildTenant; // Field for the tenant configuration
    private String contextUrl; // Field for the context URL

     // Explicit getters to ensure they're available
     public String getContextBrokerUrl() {
        return contextBrokerUrl;
    }
    
    public String getCanisMajorUrl() {
        return canisMajorUrl;
    }
    
    public String getNgsildTenant() {
        return ngsildTenant;
    }
    
    public String getContextUrl() {
        return contextUrl;
    }
}
