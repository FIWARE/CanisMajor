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
   - Specifies the address of the NGSI (Next Generation Service Interface) server or endpoint for test interaction.

2. **Maven Command**:
   `mvn clean test`
   - `clean`: Deletes the `target` directory, ensuring a clean build environment.
   - `test`: Compiles the source code and runs all unit tests in the project.

By using this approach, you ensure that the integration tests are executed against the correct NGSI endpoint, which should resolve the build failure issue.

If you continue to experience problems after following these steps, please open an issue in the GitHub repository with detailed information about the error you're encountering.