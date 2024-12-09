package validator.model;

public record ValidationInfo(
    String entityId,
    String status,
    String transactionHash,
    String blockHash,
    Long blockNumber,
    String fromAddress
) {
    // Records automatically generate getters, so these methods are unnecessary
    // and should be removed unless you need custom implementations
} 