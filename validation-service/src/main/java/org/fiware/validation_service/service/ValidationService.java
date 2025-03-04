package org.fiware.validation_service.service;

import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.validation_service.client.ValidationHttpClient;
import org.fiware.validation_service.client.model.Entity;
import org.fiware.validation_service.model.Discrepancy;
import org.fiware.validation_service.model.ValidationResult;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class ValidationService {

    private final ValidationHttpClient validationHttpClient;

    public ValidationResult validateTransaction(String entityId) {
        try {
            // Fetch data from both sources asynchronously
            CompletableFuture<Entity> orionEntityFuture = validationHttpClient.fetchEntityById(entityId);
            CompletableFuture<Entity> canisMajorEntityFuture = validationHttpClient.fetchCanisMajorData(entityId);
            
            // Wait for both futures to complete
            CompletableFuture.allOf(orionEntityFuture, canisMajorEntityFuture).join();
            
            // Get the results
            Entity orionEntity = orionEntityFuture.get();
            Entity canisMajorEntity = canisMajorEntityFuture.get();
            
            // Compare the entities and create a validation result
            List<Discrepancy> discrepancies = compareEntities(orionEntity, canisMajorEntity);
            
            // Create and return the validation result
            ValidationResult result = new ValidationResult();
            result.setValid(discrepancies.isEmpty());
            result.setEntityId(entityId);
            result.setTimestamp(OffsetDateTime.now());
            result.setDiscrepancies(discrepancies);
            
            return result;
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error validating transaction: {}", entityId, e);
            throw new RuntimeException("Failed to validate transaction", e);
        }
    }
    
    private List<Discrepancy> compareEntities(Entity orionEntity, Entity canisMajorEntity) {
        List<Discrepancy> discrepancies = new ArrayList<>();
        
        // Compare entity type
        if (!orionEntity.getType().equals(canisMajorEntity.getType())) {
            Discrepancy discrepancy = new Discrepancy();
            discrepancy.setField("type");
            discrepancy.setOrionValue(orionEntity.getType());
            discrepancy.setCanisMajorValue(canisMajorEntity.getType());
            discrepancies.add(discrepancy);
        }
        
        // Extract TxReceipts from both entities
        Map<String, Object> orionProperties = (Map<String, Object>) orionEntity.getAdditionalProperties().get("TxReceipts");
        Map<String, Object> canisMajorProperties = (Map<String, Object>) canisMajorEntity.getAdditionalProperties().get("TxReceipts");
        
        if (orionProperties != null && canisMajorProperties != null) {
            Map<String, Object> orionValue = (Map<String, Object>) orionProperties.get("value");
            Map<String, Object> canisMajorValue = (Map<String, Object>) canisMajorProperties.get("value");
            
            // Compare key transaction fields
            compareField(discrepancies, "status", orionValue, canisMajorValue);
            compareField(discrepancies, "blockNumber", orionValue, canisMajorValue);
            compareField(discrepancies, "transactionHash", orionValue, canisMajorValue);
            compareField(discrepancies, "blockHash", orionValue, canisMajorValue);
            compareField(discrepancies, "from", orionValue, canisMajorValue);
            compareField(discrepancies, "to", orionValue, canisMajorValue);
        } else {
            // If TxReceipts is missing in either entity
            Discrepancy discrepancy = new Discrepancy();
            discrepancy.setField("TxReceipts");
            discrepancy.setOrionValue(orionProperties != null ? "present" : "missing");
            discrepancy.setCanisMajorValue(canisMajorProperties != null ? "present" : "missing");
            discrepancies.add(discrepancy);
        }
        
        return discrepancies;
    }
    
    private void compareField(List<Discrepancy> discrepancies, String fieldName, 
                             Map<String, Object> orionValue, Map<String, Object> canisMajorValue) {
        Object orionField = orionValue.get(fieldName);
        Object canisMajorField = canisMajorValue.get(fieldName);
        
        // Check if field exists in both
        if (orionField == null || canisMajorField == null) {
            Discrepancy discrepancy = new Discrepancy();
            discrepancy.setField(fieldName);
            discrepancy.setOrionValue(orionField != null ? orionField.toString() : "missing");
            discrepancy.setCanisMajorValue(canisMajorField != null ? canisMajorField.toString() : "missing");
            discrepancies.add(discrepancy);
            return;
        }
        
        // Check if values are equal
        if (!orionField.equals(canisMajorField)) {
            Discrepancy discrepancy = new Discrepancy();
            discrepancy.setField(fieldName);
            discrepancy.setOrionValue(orionField.toString());
            discrepancy.setCanisMajorValue(canisMajorField.toString());
            discrepancies.add(discrepancy);
        }
    }
}
