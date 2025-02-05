/*
 This implementation of the validation service:
- Compares all relevant fields between Orion and blockchain responses
- Provides detailed validation errors for each mismatched field
- Handles JSON parsing and null checks
- Uses logging for error tracking
- Returns structured validation results
 */

package validator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import validator.model.ValidationResult;
import jakarta.inject.Singleton;
import validator.client.ValidationHttpClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@RequiredArgsConstructor
public class ValidationService {
    private static final Logger logger = LoggerFactory.getLogger(ValidationService.class);
    private final ValidationHttpClient validationHttpClient;
    private final ObjectMapper mapper = new ObjectMapper();

    public ValidationResult validateEntity(String entityId) {
        try {
            String orionData = validationHttpClient.fetchOrionData(entityId);
            String blockchainData = validationHttpClient.fetchBlockchainData(entityId);

            if (orionData == null || orionData.isEmpty()) {
                logger.error("No data found from Orion for entityId: {}", entityId);
                return new ValidationResult(false, List.of("No data found from Orion"));
            }

            if (blockchainData == null || blockchainData.isEmpty()) {
                logger.error("No data found from Canis Major for entityId: {}", entityId);
                return new ValidationResult(false, List.of("No data found from Canis Major"));
            }

            List<String> validationErrors = compareData(orionData, blockchainData);
            return new ValidationResult(validationErrors.isEmpty(), validationErrors);
        } catch (Exception e) {
            logger.error("Error validating entity: {}", entityId, e);
            return new ValidationResult(false, List.of("Validation error: " + e.getMessage()));
        }
    }

    private List<String> compareData(String orionData, String blockchainData) {
        List<String> errors = new ArrayList<>();
        try {
            JsonNode orionNode = mapper.readTree(orionData);
            JsonNode blockchainNode = mapper.readTree(blockchainData);
            
            JsonNode txReceipts = orionNode.get("TxReceipts").get("value");
            
            validateField(txReceipts, blockchainNode, "status", "Status", errors);
            validateField(txReceipts, blockchainNode, "blockNumber", "Block Number", errors);
            validateField(txReceipts, blockchainNode, "transactionHash", "Transaction Hash", errors);
            validateField(txReceipts, blockchainNode, "blockHash", "Block Hash", errors);
            validateField(txReceipts, blockchainNode, "from", "From Address", errors);
            validateField(txReceipts, blockchainNode, "to", "To Address", errors);
            
            return errors;
        } catch (JsonProcessingException e) {
            logger.error("Error parsing JSON data", e);
            errors.add("Error parsing JSON data: " + e.getMessage());
            return errors;
        }
    }

    private void validateField(JsonNode orion, JsonNode blockchain, String fieldName, String displayName, List<String> errors) {
        JsonNode orionValue = orion.get(fieldName);
        JsonNode blockchainValue = blockchain.get(fieldName);
        
        if (orionValue == null || blockchainValue == null) {
            errors.add(displayName + " field missing in one or both responses");
            return;
        }
        
        if (!orionValue.equals(blockchainValue)) {
            errors.add(displayName + " mismatch: Orion=" + orionValue + ", Blockchain=" + blockchainValue);
        }
    }
}
 