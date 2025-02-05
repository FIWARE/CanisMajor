package validator.controller;

import io.micronaut.http.annotation.*;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
//import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import validator.service.ValidationService;
import validator.model.ValidationResult;



@Slf4j // for handling logging through Lombok
@Controller("/service/v1/validation") //Marks this class as a Micronaut web controller
public class ValidationController {
    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @Post("/compare")
    public HttpResponse<ValidationResult> compareResponses(@Body CompareRequest request) {
        try {
            // Call the validation service to perform the validation
            ValidationResult result = validationService.validateEntity(request.getEntityId());
            return HttpResponse.ok(result);
        } catch (ValidationException e) {
            log.error("Error fetching data from broker: {}", e.getMessage());
            return HttpResponse.status(HttpStatus.BAD_GATEWAY); // Return HTTP 502 Bad Gateway on error
        }
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
