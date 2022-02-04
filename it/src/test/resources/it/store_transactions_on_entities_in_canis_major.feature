Feature: Store transactions on entities in CanisMajor
  CUD operations on entities in the broker should be persisted in CanisMajor.

  Scenario: A test-store, created at orion-ld, is available through CanisMajor.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Franzi is registered in vault.
    And Mira is registered in vault.
    When Franzi creates the test-store.
    Then Only one transaction should be persisted for the entity.
    And The transaction to persist test-store can be read through CanisMajor.

  Scenario: Multiple entity creations are persisted in CanisMajor.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Franzi is registered in vault.
    And Mira is registered in vault.
    When Franzi creates the test-store.
    And  Mira creates another entity.
    Then All transactions should be in CanisMajor.

  Scenario: When multiple changes happen at an entity, they are all persisted in CanisMajor.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Franzi is registered in vault.
    When Franzi creates the test-store.
    And Franzi updates the test store.
    And Franzi deletes test store.
    Then All transactions should be in CanisMajor.