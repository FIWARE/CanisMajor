package org.fiware.validation_service.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.validation_service.model.ValidationResult;
import org.fiware.validation_service.service.ValidationService;

import java.util.NoSuchElementException;

@Slf4j
@Controller("/validation")
@RequiredArgsConstructor
public class ValidationController {

    private final ValidationService validationService;

    @Post("/transaction/{entityId}")
    public HttpResponse<ValidationResult> validateTransaction(String entityId) {
        try {
            ValidationResult result = validationService.validateTransaction(entityId);
            return HttpResponse.ok(result);
        } catch (NoSuchElementException e) {
            log.error("Transaction not found: {}", e.getMessage());
            return HttpResponse.status(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error validating transaction: {}", e.getMessage());
            return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
