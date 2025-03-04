package org.fiware.validation_service.client;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.fiware.validation_service.client.api.EntitiesApi;
import org.fiware.validation_service.client.invoker.ApiClient;
import org.fiware.validation_service.client.invoker.ApiException;
import org.fiware.validation_service.client.model.Entity;
import org.fiware.validation_service.config.NgsiConfig;

import java.util.concurrent.CompletableFuture;

@Singleton 
public class ValidationHttpClient {

    private final EntitiesApi orionLdClient;
    private final EntitiesApi canisMajorClient;
    private final String contextUrl;
    private final String tenant;

    @Inject
    public ValidationHttpClient(NgsiConfig ngsiConfig) {
        // Initialize Orion-LD client
        ApiClient orionApiClient = new ApiClient();
        orionApiClient.setBasePath("http://" + ngsiConfig.getContextBrokerUrl());
        this.orionLdClient = new EntitiesApi(orionApiClient);
        
        // Initialize Canis Major client
        ApiClient canisMajorApiClient = new ApiClient();
        canisMajorApiClient.setBasePath("http://" + ngsiConfig.getCanisMajorUrl());
        this.canisMajorClient = new EntitiesApi(canisMajorApiClient);
        
        this.contextUrl = ngsiConfig.getContextUrl();
        this.tenant = ngsiConfig.getNgsildTenant();
    }

    // Method to fetch an entity by its ID from Orion-LD
    public CompletableFuture<Entity> fetchEntityById(String entityId) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String linkHeader = "<" + contextUrl + ">; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\"";
                return (Entity) orionLdClient.retrieveEntityById(entityId, null, linkHeader, tenant);
            } catch (ApiException e) {
                throw new RuntimeException("Failed to fetch entity: " + e.getMessage(), e);
            }
        });
    }

    // Method to fetch data from Canis Major
    public CompletableFuture<Entity> fetchCanisMajorData(String entityId) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String linkHeader = "<" + contextUrl + ">; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\"";
                return (Entity) canisMajorClient.retrieveEntityById(entityId, null, linkHeader, tenant);
            } catch (ApiException e) {
                throw new RuntimeException("Failed to fetch data from Canis Major: " + e.getMessage(), e);
            }
        });
    }
    

}
