package validator.controller;

import org.springframework.web.bind.annotation.*;
import validator.service.ValidationService;
import validator.model.ValidationResult;
import validator.model.ValidationInfo;

@RestController
@RequestMapping("/validation service")
public class ValidationController {
    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/{entityId}")
    public ValidationInfo getValidationInfo(@PathVariable String entityId) {
        return validationService.getValidationInfo(entityId);
    }

    @PostMapping("/compare")
    public ValidationResult compareResponses(@RequestBody ValidationRequest request) {
        return validationService.validateEntityFromResponses(
            request.orionResponse(), 
            request.blockchainResponse()
        );
    }
} 