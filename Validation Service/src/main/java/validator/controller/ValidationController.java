package validator.controller;

import io.micronaut.http.annotation.*;
import io.micronaut.http.HttpResponse;
import validator.service.ValidationService;
import validator.model.ValidationResult;

@Controller("/service/v1/validation")
public class ValidationController {
    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @Post("/compare")
    public HttpResponse<ValidationResult> compareResponses(@Body CompareRequest request) {
        // Call the validation service to perform the validation
        ValidationResult result = validationService.validateEntity(request.getEntityId());
        return HttpResponse.ok(result);
    }

    // Inner class to represent the request body
    public static class CompareRequest {
        private String entityId;

        // Getter and Setter
        public String getEntityId() {
            return entityId;
        }

        public void setEntityId(String entityId) {
            this.entityId = entityId;
        }
    }
}
