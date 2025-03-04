package org.fiware.validation_service.integration;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.fiware.validation_service.model.Discrepancy;
import org.fiware.validation_service.model.ValidationResult;
import org.awaitility.Awaitility;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class ValidationServiceStepDefinitions {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final String NGSILD_TENANT = "orion";
    private static final String CONTEXT_BROKER_URL = "127.0.0.1:1026";
    private static final String CANIS_MAJOR_URL = "127.0.0.1:4000";
    private static final String VALIDATION_SERVICE_URL = "127.0.0.1:8080";
    
    private String testEntityId;
    private ValidationResult validationResult;
    private HttpClient httpClient;
    
    @Before
    public void setup() {
        httpClient = HttpClient.newHttpClient();
        testEntityId = "urn:ngsi-ld:dlttxreceipt:" + System.currentTimeMillis();
    }
    
    @Given("Orion-LD and Canis Major are running")
    public void orion_and_canis_major_are_running() {
        Awaitility.await("Wait for Orion-LD")
            .atMost(Duration.of(30, ChronoUnit.SECONDS))
            .until(() -> isServiceRunning(CONTEXT_BROKER_URL, "/version"));
            
        Awaitility.await("Wait for Canis Major")
            .atMost(Duration.of(30, ChronoUnit.SECONDS))
            .until(() -> isServiceRunning(CANIS_MAJOR_URL, "/health"));
    }
    
    @Given("A transaction entity exists in both systems")
    public void transaction_entity_exists_in_both_systems() throws Exception {
        // This would typically create or ensure a transaction entity exists
        // For testing purposes, we could use a known entity ID
        testEntityId = "urn:ngsi-ld:dlttxreceipt:0xa46d2e3b190d36fbb8af5d0a1c212d8036cf007e6ec4d1309904e052d25e5499";
    }
    
    @When("I validate the transaction entity")
    public void validate_transaction_entity() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(String.format("http://%s/validation/transaction/%s", 
                VALIDATION_SERVICE_URL, testEntityId)))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.noBody())
            .build();
            
        HttpResponse<String> response = httpClient.send(request, 
            HttpResponse.BodyHandlers.ofString());
            
        assertEquals(200, response.statusCode(), "Validation request should succeed");
        validationResult = OBJECT_MAPPER.readValue(response.body(), ValidationResult.class);
    }
    
    @Then("The validation result should indicate consistency")
    public void validation_result_should_indicate_consistency() {
        assertTrue(validationResult.isValid(), "Transaction data should be consistent");
        assertEquals(testEntityId, validationResult.getEntityId(), "Entity ID should match");
        assertTrue(validationResult.getDiscrepancies().isEmpty(), "No discrepancies should be found");
    }
    
    @Then("The validation result should show discrepancies")
    public void validation_result_should_show_discrepancies() {
        assertFalse(validationResult.isValid(), "Transaction data should be inconsistent");
        assertEquals(testEntityId, validationResult.getEntityId(), "Entity ID should match");
        assertFalse(validationResult.getDiscrepancies().isEmpty(), "Discrepancies should be found");
        
        // Optionally check specific discrepancies
        List<Discrepancy> discrepancies = validationResult.getDiscrepancies();
        discrepancies.forEach(discrepancy -> {
            System.out.println("Field: " + discrepancy.getField());
            System.out.println("Orion value: " + discrepancy.getOrionValue());
            System.out.println("Canis Major value: " + discrepancy.getCanisMajorValue());
        });
    }
    
    private boolean isServiceRunning(String host, String path) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(String.format("http://%s%s", host, path)))
                .GET()
                .build();
                
            HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());
                
            return response.statusCode() >= 200 && response.statusCode() < 300;
        } catch (Exception e) {
            return false;
        }
    }
}
