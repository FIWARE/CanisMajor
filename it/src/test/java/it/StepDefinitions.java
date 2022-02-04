package it;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import it.pojo.Address;
import it.pojo.CMEntitesResponse;
import it.pojo.CMEntityResponse;
import it.pojo.Entity;
import it.pojo.EntityTransactions;
import it.pojo.ErrorMessage;
import it.pojo.EthereumPluginMount;
import it.pojo.PluginConfig;
import it.pojo.Property;
import it.pojo.TestAccount;
import it.pojo.VaultAccount;
import it.pojo.VaultPlugin;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.awaitility.Awaitility;
import org.jetbrains.annotations.NotNull;

import java.net.URI;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

public class StepDefinitions {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	public static final String NGSILD_TENANT = "orion";

	{
		OBJECT_MAPPER.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	private static final String CANIS_MAJOR_ADDRESS = "localhost:4000";
	private static final String VAULT_ADDRESS = "localhost:8200";


	private static final String VAULT_ROOT_TOKEN = "vault-plaintext-root-token";

	private static final Map<String, TestAccount> TEST_ACCOUNT_MAP = Map.of(
			"Franzi", new TestAccount("franzi", "minimum symptom minute gloom tragic situate silver mechanic salad amused elite beef"),
			"Mira", new TestAccount("mira", "ridge bargain sight table never risk isolate hold jaguar reflect curve globe awake witness reveal")
	);

	private static final int TX_AWAIT_MAX_S = 15;

	// we use testCount for the tests, so that we dont need to empty the blockchain all the time
	// we start at a random point, to be able to run multiple times in local testing.
	private int testCounter = (int) (Math.random() * 10000);


	Map<String, Integer> expectedTxMap = new HashMap<>();

	@Before
	public void setup() throws Exception {
		testCounter++;
		expectedTxMap = new HashMap<>();
	}

	@Given("CanisMajor is running and available for requests.")
	public void setup_canis_major_in_docker() throws Exception {
		Awaitility
				.await("Wait for canis major.")
				.atMost(Duration.of(60, ChronoUnit.SECONDS))
				.until(this::assertSystemIsRunning);
	}

	private boolean assertSuccess(Request request) {
		OkHttpClient okHttpClient = new OkHttpClient();
		try {
			return okHttpClient.newCall(request).execute().code() == 200;
		} catch (Exception e) {
			// in case of an exception we assume the system is not reachable yet.
			return false;
		}
	}

	private boolean assertSystemIsRunning() {
		return assertSuccess(new Request.Builder()
				.url(String.format("http://%s/health", CANIS_MAJOR_ADDRESS))
				.build());

	}

	private boolean assertVaultIsRunning() {
		return assertSuccess(new Request.Builder()
				.url(String.format("http://%s/v1/sys/health", VAULT_ADDRESS))
				.build());
	}

	@Given("Vault is configured as a signing endpoint.")
	public void configure_ethereum_plugin_vault() throws Exception {
		Awaitility
				.await("Wait for vault.")
				.atMost(Duration.of(60, ChronoUnit.SECONDS))
				.until(this::assertVaultIsRunning);

		RequestBody registrationRequestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new VaultPlugin()), MediaType.get("application/json"));

		Request registrationRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/sys/plugins/catalog/secret/vault-ethereum", VAULT_ADDRESS))
				.method("PUT", registrationRequestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response registrationResponse = okHttpClient.newCall(registrationRequest).execute();
		assertEquals(204, registrationResponse.code(), "A plugin should have been registered succesfully.");

		RequestBody enableRequestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new EthereumPluginMount()), MediaType.get("application/json"));
		Request enableRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/sys/mounts/ethereum", VAULT_ADDRESS))
				.method("POST", enableRequestBody)
				.build();
		Response enableResponse = okHttpClient.newCall(enableRequest).execute();
		if (enableResponse.code() == 400) {
			ErrorMessage errorMessage = OBJECT_MAPPER.readValue(enableResponse.body().string(), ErrorMessage.class);
			assertEquals("path is already in use at ethereum/", errorMessage.getErrors().get(0), "If the plugin is already configured, we are fine.");
		} else {
			assertEquals(204, enableResponse.code(), "The plugin should have been enabled successfully.");
		}

		RequestBody configRequestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new PluginConfig()), MediaType.get("application/json"));

		Request configRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/ethereum/config", VAULT_ADDRESS))
				.method("PUT", configRequestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		Response configResponse = okHttpClient.newCall(configRequest).execute();
		if (configResponse.code() < 200 || configResponse.code() > 299) {
			fail("The plugin should be configured succeesfully.");
		}
	}

	@Given("Franzi is registered in vault.")
	public void register_franzi_in_vault() throws Exception {
		RequestBody accountRegistrationRequest = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new VaultAccount(TEST_ACCOUNT_MAP.get("Franzi").getMnemonic())), MediaType.get("application/json"));

		Request registrationRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/ethereum/accounts/franzi", VAULT_ADDRESS))
				.method("PUT", accountRegistrationRequest)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response registrationResponse = okHttpClient.newCall(registrationRequest).execute();
		assertEquals(200, registrationResponse.code(), "The account should be successfully put into vault.");
	}

	@Given("Mira is registered in vault.")
	public void register_mira_in_vault() throws Exception {
		RequestBody accountRegistrationRequest = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new VaultAccount(TEST_ACCOUNT_MAP.get("Mira").getMnemonic())), MediaType.get("application/json"));

		Request registrationRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/ethereum/accounts/mira", VAULT_ADDRESS))
				.method("PUT", accountRegistrationRequest)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response registrationResponse = okHttpClient.newCall(registrationRequest).execute();
		assertEquals(200, registrationResponse.code(), "The account should be successfully put into vault.");
	}

	@When("Franzi creates the test-store.")
	public void create_test_store() throws Exception {

		Address address = new Address();
		address.setStreetAddress("Via Cascata 1");
		address.setAdressLocality("Partschins");
		address.setAddressRegion("Autonome Provinz Bozen");
		address.setPostalCode("39020");

		Entity testStore = getStore(String.format("urn:ngsi-ld:Building:%s", testCounter), address);
		createEntity("Franzi", testStore);
	}

	@When("Franzi updates the test store.")
	public void update_test_store() throws Exception {

		Address address = new Address();
		address.setStreetAddress("Via S. Valentino 51/A");
		address.setAdressLocality("Meran");
		address.setAddressRegion("Autonome Provinz Bozen");
		address.setPostalCode("39012");

		String storeID = String.format("urn:ngsi-ld:Building:%s", testCounter);

		Entity testStore = getStore(storeID, address);

		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(testStore), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.addHeader("Wallet-Type", "Vault")
				.addHeader("Wallet-Address", "http://vault:8200/v1/ethereum/accounts/franzi")
				.addHeader("Wallet-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s/attrs", CANIS_MAJOR_ADDRESS, storeID))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertTrue(response.code() >= 200 && response.code() < 300, "We expect any kind of successful response.");
		addTxToExpectations(storeID);
	}


	@When("Franzi deletes test store.")
	public void franzi_deletes_test_store() throws Exception {

		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.addHeader("Wallet-Type", "Vault")
				.addHeader("Wallet-Address", "http://vault:8200/v1/ethereum/accounts/franzi")
				.addHeader("Wallet-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s", CANIS_MAJOR_ADDRESS, String.format("urn:ngsi-ld:Building:%s", testCounter)))
				.method("DELETE", null)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(204, response.code(), "We expect the entity to be deleted.");

		//TODO: deletion not supported by canismajor, yet. Implement.
	}

	@NotNull
	private Entity getStore(String id, Address address) {
		Property categoryProperty = new Property();
		categoryProperty.setType("Property");
		categoryProperty.setValue(List.of("commercial"));


		Property verifiedProperty = new Property();
		verifiedProperty.setValue(true);

		Property addressProperty = new Property();
		addressProperty.setValue(address);
		addressProperty.setVerified(verifiedProperty);
		Map<String, Object> propertyMap = new HashMap<>();
		propertyMap.put("category", categoryProperty);
		propertyMap.put("address", addressProperty);

		Entity testStore = new Entity();
		testStore.setId(URI.create(id));
		testStore.setType("Building");
		testStore.setPropertyMap(propertyMap);
		return testStore;
	}

	@When("Mira creates another entity.")
	public void create_another_entity() throws Exception {


		Address address = new Address();
		address.setStreetAddress("Bernhardstraße 16");
		address.setAdressLocality("Dresden");
		address.setAddressRegion("Saxony");
		address.setPostalCode("01069");

		Entity testStore = getStore(String.format("urn:ngsi-ld:Building:%s-1", testCounter), address);
		createEntity("Mira", testStore);

	}

	@Then("All transactions should be in CanisMajor.")
	public void assert_all_tx_stored() throws Exception {
		assertFalse(expectedTxMap.isEmpty(), "We should have at least some expectations.");
		expectedTxMap.forEach((k, v) -> {
			List<Object> entityResponses = new ArrayList<>();
			// the entity should eventually be available in the blockchain
			Awaitility.await().atMost(TX_AWAIT_MAX_S, TimeUnit.SECONDS).until(() -> {
				EntityTransactions entityTransactions = getTransactionsForEntity(k);
				if (!entityTransactions.getTxDetails().isEmpty()) {
					entityResponses.addAll(entityTransactions.getTxDetails());
					return true;
				}
				return false;
			});
			assertEquals(v, entityResponses.size(), String.format("%s transactions where expected for %s.", v, k));
		});
	}

	@Then("The transaction to persist test-store can be read through CanisMajor.")
	public void get_test_store() throws Exception {
		List<Object> entityResponses = new ArrayList<>();

		// the entity should eventually be available in the blockchain
		Awaitility.await().atMost(TX_AWAIT_MAX_S, TimeUnit.SECONDS).until(() -> {
			EntityTransactions entityTransactions = getTransactionsForEntity(String.format("urn:ngsi-ld:Building:%s", testCounter));
			if (!entityTransactions.getTxDetails().isEmpty()) {
				entityResponses.addAll(entityTransactions.getTxDetails());
				return true;
			}
			return false;
		});

		assertEquals(1, entityResponses.size(),
				"Only one such transaction should exist."
		);

		Request request = new Request.Builder()
				// we can only request by db id
				.url(String.format("http://%s/entity/%s", CANIS_MAJOR_ADDRESS, String.format("urn:ngsi-ld:Building:%s", testCounter)))
				.build();

		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(200, response.code(), "We expect a successful response.");
		CMEntityResponse cmEntityResponse = OBJECT_MAPPER.readValue(response.body().string(), CMEntityResponse.class);
		assertEquals(String.format("urn:ngsi-ld:Building:%s", testCounter), cmEntityResponse.getEntityId());

	}

	@Then("Only one transaction should be persisted for the entity.")
	public void assert_only_one_transaction() throws Exception {
		List<Object> entityResponses = new ArrayList<>();

		// the entity should eventually be available in the blockchain
		Awaitility.await().atMost(TX_AWAIT_MAX_S, TimeUnit.SECONDS).until(() -> {
			EntityTransactions entityTransactions = getTransactionsForEntity(String.format("urn:ngsi-ld:Building:%s", testCounter));
			if (!entityTransactions.getTxDetails().isEmpty()) {
				entityResponses.addAll(entityTransactions.getTxDetails());
				return true;
			}
			return false;
		});

		assertEquals(1, entityResponses.size(),
				"Only one such transaction should exist."
		);
	}

	private EntityTransactions getTransactionsForEntity(String entityId) throws Exception {
		Request request = new Request.Builder()
				// we can only request by db id
				.url(String.format("http://%s/entity", CANIS_MAJOR_ADDRESS))
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		if (response.code() != 200) {
			List.of();
		}

		CMEntitesResponse cmEntityResponse = OBJECT_MAPPER.readValue(response.body().string(), CMEntitesResponse.class);


		List<CMEntityResponse> filteredResponses = cmEntityResponse.getRecords().stream()
				.filter(cmer -> cmer.getEntityId().equals(entityId))
				.collect(Collectors.toList());
		return new EntityTransactions(entityId, (List<Object>) filteredResponses.stream().flatMap(cmer -> OBJECT_MAPPER.convertValue(cmer.getTxDetails(), List.class).stream()).collect(Collectors.toList()));
	}


	private void createEntity(String ethAccount, Entity entity) throws Exception {
		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(entity), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.addHeader("Wallet-Type", "Vault")
				.addHeader("Wallet-Address", "http://vault:8200/v1/ethereum/accounts/" + ethAccount.toLowerCase(Locale.ROOT))
				.addHeader("Wallet-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/ngsi-ld/v1/entities/", CANIS_MAJOR_ADDRESS))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(201, response.code(), "We expect a successful response.");
		addTxToExpectations(entity.getId().toString());
	}

	private void addTxToExpectations(String id) {
		if (expectedTxMap.containsKey(id)) {
			expectedTxMap.put(id, expectedTxMap.get(id) + 1);
		} else {
			expectedTxMap.put(id, 1);
		}
	}


}
