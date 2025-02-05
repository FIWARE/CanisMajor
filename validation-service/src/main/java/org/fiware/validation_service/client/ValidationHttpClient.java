package org.fiware.validation_service.config;

import io.micronaut.context.annotation.ConfigurationProperties;


// Marks this class as a singleton - only one instance will exist in the application
@Singleton
public class ValidationHttpClient {
    private final HttpClient client;
    private final String tenant; // Field for tenant configuration
    private final String contextBrokerUrl; // Field for broker URL configuration
    private final String canisMajorUrl; // Field for Canis Major URL configuration

    // Updated constructor to accept tenant, broker URL, and Canis Major URL as parameters
    public ValidationHttpClient(String NGSILD_TENANT, String contextBrokerUrl, String canisMajorUrl) {
        this.client = HttpClient.newHttpClient();
        this.tenant = NGSILD_TENANT; // Set the tenant
        this.brokerUrl = contextBrokerUrl; // Set the broker URL
        this.canisMajorUrl = canisMajorUrl; // Set the Canis Major URL
    }

    // Method to fetch data from the broker
    public CompletableFuture<String> fetchBrokerData(String entityId) {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(brokerUrl + "/ngsi-ld/v1/entities/?type=DLTtxReceipt&q=refEntity==" + entityId)) // Use the broker URL
            .header("Link", "<https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\"")
            .header("NGSILD-Tenant", tenant) // Use the tenant
            .header("Accept", "application/json")
            .GET()
            .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body);
    }

    // Method to fetch data from a blockchain service
    public String fetchBlockchainData(String entityId) throws Exception {
        // Builds an HTTP request:
        HttpRequest request = HttpRequest.newBuilder()
            // Sets the URI for the blockchain service endpoint
            .uri(new URI("http://localhost:4000/entity/" + entityId))
            // Sets Accept header to receive JSONresponse
            .header("Accept", "application/json")
            // Specifies this is a GET request
            .GET()
            // Finalizes the request building
            .build();

        // Sends the request and returns the response body as a String
        return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
    }

    // Method to fetch data from Canis Major
    public CompletableFuture<String> fetchCanisMajorData(String entityId) {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(canisMajorUrl + "/ngsi-ld/v1/entities/" + entityId)) // Use the Canis Major URL
            .header("Accept", "application/json")
            .header("NGSILD-Tenant", tenant) // Use the tenant
            .GET()
            .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body);
    }
}
