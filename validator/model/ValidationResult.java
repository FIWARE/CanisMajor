package validator.model;

import java.util.List;

public record ValidationResult(boolean isValid, List<String> errors) {
    public String getErrorMessage() {
        return String.join(", ", errors);
    }
} 