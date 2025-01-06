# Troubleshooting Guide: Canis Major Integration Tests

## Common Issue: Build Failure During Integration Tests

This guide addresses the most common issue encountered with the Canis Major adapter: build failure when running integration tests. If you experience a build failure while executing the `mvn clean test` command, follow these steps to resolve the issue.

### Solution: Updating 'NGSI Address' environment variable

1. **Check the IP Address of the Canis Major Container**

   Run the following command to obtain the IP address of the Canis Major container:

   ```bash
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <canis_major_container_name_or_id>
   ```

   Replace `<canis_major_container_name_or_id>` with the actual name or ID of your Canis Major container.

2. **Run Tests with Updated NGSI Address**

   Navigate to the `/it` folder and execute the following command:

   ```bash
   NGSI_ADDRESS=<ip_address_of_canis_major_container>:4000 mvn clean test
   ```

   Replace `<ip_address_of_canis_major_container>` with the IP address obtained in step 1.

### Command Breakdown

The command used in step 2 consists of two main parts:

1. **Environment Variable Assignment**:
   `NGSI_ADDRESS=<ip_address_of_canis_major_container>:4000`
   - Sets the `NGSI_ADDRESS` environment variable.
   - Specifies the address of the ETSI NGSI-LD API of the Canis Major.

2. **Maven Command**:
   `mvn clean test`
   - `clean`: Deletes the `target` directory, ensuring a clean build environment.
   - `test`: Compiles the source code and runs all unit tests in the project.

By using this approach, you ensure that the integration tests are executed against the correct Canis Major endpoint, which should resolve the build failure issue.

If you continue to experience problems after following the provided steps, please open an issue in the GitHub repository with detailed information about the error you are encountering.

## Common Issue: Problem to execute the integration test again.

If you try to execute twice the integration tests, you will receive an error message like the following:

```bash
[INFO] -------------------------------------------------------
[INFO] T E S T S
[INFO] -------------------------------------------------------
[INFO] Running it.RunCucumberTest

Scenario: A test-store, created at orion-ld, is available through CanisMajor. 
 # it/store_transactions_on_entities_in_canis_major.feature:4

 Given CanisMajor is running and available for requests.
 
 # it.StepDefinitions.setup_canis_major_in_docker()

 And Vault is configured as a signing endpoint.
 
 # it.StepDefinitions.configure_ethereum_plugin_vault()

 And Franzi is registered in vault.
 
 # it.StepDefinitions.register_franzi_in_vault()

 And Mira is registered in vault.
 
 # it.StepDefinitions.register_mira_in_vault()

 When Franzi creates the test-store.
 
 # it.StepDefinitions.create_test_store()

 Then Only one transaction should be persisted for the entity.
 
 # it.StepDefinitions.assert_only_one_transaction()

org.awaitility.core.ConditionTimeoutException: Condition with it.StepDefinitions was not

 fulfilled within 15 seconds.

at org.awaitility.core.ConditionAwaiter.await(ConditionAwaiter.java:165)

at org.awaitility.core.CallableCondition.await(CallableCondition.java:78)

at org.awaitility.core.CallableCondition.await(CallableCondition.java:26)

at org.awaitility.core.ConditionFactory.until(ConditionFactory.java:895)

at org.awaitility.core.ConditionFactory.until(ConditionFactory.java:864)

at it.StepDefinitions.assert_only_one_transaction(StepDefinitions.java:559)

at ✽.Only one transaction should be persisted for the entity.

(classpath:it/store_transactions_on_entities_in_canis_major.feature:10)

 And The transaction to persist test-store can be read through CanisMajor.
 # it.StepDefinitions.get_test_store()
```

This is produced by the intent to save again the information of the users' credentials in the Vault.

### Solution: Clean the docker compose
Stop the docker compose and start again to ensure the Vault's content is clean before executing the integration tests again.

For a docker compose clean follow these steps for a complete Docker cleanup:
- Stop all running containers
   ```shell
   sudo docker stop $(sudo docker ps -aq)
   ```
- Remove all containers
  ```shell
   sudo docker rm $(sudo docker ps -aq)
   ```
- Remove all volumes
  ```shell
   sudo docker volume rm $(sudo docker volume ls -q)
   ```
- Remove all custom networks
  ```shell
   sudo docker network prune 
   ```

### Notes
- You can add `-f` flag to skip confirmation prompts.
- Root privileges (sudo) may be required depending on your Docker setup.
