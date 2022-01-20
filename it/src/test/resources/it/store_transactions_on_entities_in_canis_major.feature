Feature: Store transactions on entities in CanisMajor for ${storagetype}
  CUD operations on entities in the broker should be persisted in CanisMajor.

  Scenario: A test-store, created at orion-ld, is available through CanisMajor.
    Given CanisMajor is running and available for requests.
    When The test-store is created.
    Then Only one transaction should be persisted for the entity.
    Then The transaction to persist test-store can be read through CanisMajor.

  Scenario: Multiple entity creations are persisted in CanisMajor.
    Given CanisMajor is running and available for requests.
    When The test-store is created.
    When  Another entity is created.
    Then All non-destructive transactions should be in CanisMajor.

  Scenario: When multiple changes happen at an entity, they are all persisted in CanisMajor.
    Given  CanisMajor is running and available for requests.
    When The test-store is created.
    And The test-store is updated.
    And The test-store is deleted.
    Then All non-destructive transactions should be in CanisMajor.