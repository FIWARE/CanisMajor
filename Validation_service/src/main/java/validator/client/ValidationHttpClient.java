package validator.client;

// Import statements:
import jakarta.inject.Singleton;     // For dependency injection, marks class as singleton
import java.net.URI;                // For handling URIs
import java.net.http.HttpClient;    // Core class for making HTTP requests
import java.net.http.HttpRequest;   // For building HTTP requests
import java.net.http.HttpResponse;  // For handling HTTP responses


// Marks this class as a singleton - only one instance will exist in the application
@Singleton
public class ValidationHttpClient {
    // Creates a single HttpClient instance to be reused for all requests
    private final HttpClient client = HttpClient.newHttpClient();
    
    // Method to fetch data from Orion Context Broker
    public String fetchOrionData(String entityId) throws Exception {
        // Builds an HTTP request:
        HttpRequest request = HttpRequest.newBuilder()
            // Sets the URI for the request, querying for DLTtxReceipt entities with matching refEntity
            .uri(new URI("http://localhost:1026/ngsi-ld/v1/entities/?type=DLTtxReceipt&q=refEntity==" + entityId))
            // Adds Link header for JSON-LD context
            .header("Link", "<https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\"")
            // Sets the NGSILD-Tenant header to "orion"
            .header("NGSILD-Tenant", "orion")
            // Added Accept header for JSON format
            .header("Accept", "application/json")
            // Specifies this is a GET request
            .GET()
            // Finalizes the request building
            .build();

        // Sends the request and returns the response body as a String
        return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
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
}