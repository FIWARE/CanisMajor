package validator.model;

import java.util.List;

//import java.util.List;

/*public record ValidationResult(boolean isValid, List<String> errors) {
    public String getErrorMessage() {
        return String.join(", ", errors);
    }
} */

public class ValidationResult {
    private final boolean valid;
    private final List<String> messages;
    

    public ValidationResult(boolean valid, List<String> messages){
        this.valid = valid;
        this.messages = messages;
    }

    public boolean isValid() { //getter
        return valid;
    }

    public List<String> getMessages() {
        return messages;
    }
}
