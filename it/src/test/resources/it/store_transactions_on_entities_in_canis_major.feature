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
    And All transactions for Mira are persisted.
    And All transactions for Franzi are persisted.

  Scenario: When changes and queries happen, they are all persisted in CanisMajor.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Mira is registered in vault.
    And Franzi is registered in vault.
    When Franzi creates the test-store.
    And Mira updates the test store.
    And Mira retrieves the test store.
    And Mira queries for unicorns.
    And Mira queries for unicorns, providing a user id.
    Then All transactions should be in CanisMajor.
    And All transactions for Mira are persisted.

  Scenario: When multiple changes happen at an entity, they are all persisted in CanisMajor.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Franzi is registered in vault.
    When Franzi creates the test-store.
    And Franzi updates the test store.
    Then All transactions should be in CanisMajor.

  Scenario: When updates without wallet-information happen, the default account should be used.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    When Anonymous user creates a delivery.
    And Anonymous user updates a delivery.
    Then All transactions should be in CanisMajor.
    And All transactions for Default are persisted.

  Scenario: When updates with and without account happen, the default or the correct account should be used.
    Given CanisMajor is running and available for requests.
    And Vault is configured as a signing endpoint.
    And Mira is registered in vault.
    And Franzi is registered in vault.
    When Anonymous user creates a delivery.
    And Franzi creates the test-store.
    And Franzi updates the test store.
    And Mira updates the test store.
    And Anonymous user updates a delivery.
    Then All transactions should be in CanisMajor.
    And All transactions for Default are persisted.
    And All transactions for Franzi are persisted.
    And All transactions for Mira are persisted.

  Scenario: When create, update and upsert are used, all operations are persisted in the blockchain.
    Given CanisMajor is running and available for requests.
    When Anonymous user creates a delivery.
    And Anonymous user updates a delivery.
    When Anonymous upserts multiple deliveries.
    Then All transactions should be in CanisMajor.