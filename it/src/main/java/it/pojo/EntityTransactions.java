package it.pojo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

// This class encapsulates transaction data related to a specific entity, identified by entityId.
@Getter
@RequiredArgsConstructor
public class EntityTransactions {
    private final String entityId; // Unique identifier for the entity
    private final List<Object> txDetails; // List of transaction details
}
