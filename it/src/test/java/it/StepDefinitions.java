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
import it.pojo.TxDetails;
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
			"Default", new TestAccount("default", "label butter chaos blush mind north kit drill position phone decline urge claw mammal risk", "0x82AC43A26ae509eEf217330C7d862F822fF0CECB"),
			"Franzi", new TestAccount("franzi", "minimum symptom minute gloom tragic situate silver mechanic salad amused elite beef", "0xa508dD875f10C33C52a8abb20E16fc68E981F186"),
			"Mira", new TestAccount("mira", "ridge bargain sight table never risk isolate hold jaguar reflect curve globe awake witness reveal", "0x34E5b3f990e55D0651B35c817bAfb89d2877cb95")
	);

	private static final int TX_AWAIT_MAX_S = 15;

	// we use testCount for the tests, so that we dont need to empty the blockchain all the time
	// we start at a random point, to be able to run multiple times in local testing.
	private int testCounter = (int) (Math.random() * 10000);

	Map<String, Integer> expectedTxMap = new HashMap<>();
	Map<String, Integer> miraExpectedTxMap = new HashMap<>();
	Map<String, Integer> franziExpectedTxMap = new HashMap<>();
	Map<String, Integer> defaultExpectedTxMap = new HashMap<>();

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

	@Given("Default account is registered in vault.")
	public void register_default_account_in_vault() throws Exception {
		RequestBody accountRegistrationRequest = RequestBody.create(OBJECT_MAPPER.writeValueAsString(new VaultAccount(TEST_ACCOUNT_MAP.get("Default").getMnemonic())), MediaType.get("application/json"));

		Request registrationRequest = new Request.Builder()
				.addHeader("X-Vault-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/v1/ethereum/accounts/default", VAULT_ADDRESS))
				.method("PUT", accountRegistrationRequest)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response registrationResponse = okHttpClient.newCall(registrationRequest).execute();
		assertEquals(200, registrationResponse.code(), "The account should be successfully put into vault.");
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

	@When("Anonymous user creates a delivery.")
	public void create_delivery() throws Exception {
		Entity delivery = getDelivery(String.format("urn:ngsi-ld:Delivery:%s", testCounter), "awaiting_timeslot_confirmation");

		createEntity("Default", delivery);
	}

	@When("Anonymous user updates a delivery.")
	public void update_delivery() throws Exception {

		String deliveryID = String.format("urn:ngsi-ld:Delivery:%s", testCounter);
		Entity delivery = getDelivery(deliveryID, "timeslot_confirmed");

		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(delivery), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s/attrs", CANIS_MAJOR_ADDRESS, deliveryID))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertTrue(response.code() >= 200 && response.code() < 300, "We expect any kind of successful response.");
		addTxToExpectations("Default", deliveryID);
	}

	@When("Anonymous upserts multiple deliveries.")
	public void upsert_delivery() throws Exception {
		String deliveryID_1 = String.format("urn:ngsi-ld:Delivery:%s-1", testCounter);
		String deliveryID_2 = String.format("urn:ngsi-ld:Delivery:%s-2", testCounter);
		Entity delivery_1 = getDelivery(deliveryID_1, "timeslot_confirmed");
		Entity delivery_2 = getDelivery(deliveryID_2, "cancelled");
		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(List.of(delivery_1, delivery_2)), MediaType.get("application/json"));
		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.url(String.format("http://%s/ngsi-ld/v1/entityOperations/upsert", CANIS_MAJOR_ADDRESS))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertTrue(response.code() >= 200 && response.code() < 300, "We expect any kind of successful response.");
		addTxToExpectations("Default", deliveryID_1);
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
		addTxToExpectations("Franzi", storeID);
	}

	@When("Mira updates the test store.")
	public void mira_update_test_store() throws Exception {

		Address address = new Address();
		address.setStreetAddress("Hauptstraße 4");
		address.setAdressLocality("Dresden");
		address.setAddressRegion("Saxony");
		address.setPostalCode("01189");

		String storeID = String.format("urn:ngsi-ld:Building:%s", testCounter);

		Entity testStore = getStore(storeID, address);

		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(testStore), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("NGSILD-Tenant", NGSILD_TENANT)
				.addHeader("Wallet-Type", "Vault")
				.addHeader("Wallet-Address", "http://vault:8200/v1/ethereum/accounts/mira")
				.addHeader("Wallet-Token", VAULT_ROOT_TOKEN)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s/attrs", CANIS_MAJOR_ADDRESS, storeID))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertTrue(response.code() >= 200 && response.code() < 300, "We expect any kind of successful response.");
		addTxToExpectations("Mira", storeID);
	}

	private Entity getDelivery(String id, String status) {

		Property nameProperty = new Property();
		nameProperty.setType("Property");
		nameProperty.setValue(id);

		Property allowedTimeslotProperty = new Property();
		allowedTimeslotProperty.setType("Property");
		allowedTimeslotProperty.setValue("");

		Property requestedTimeslotProperty = new Property();
		requestedTimeslotProperty.setType("Property");
		requestedTimeslotProperty.setValue("2021-12-25T12:30:00+00:00");

		Property deliveryMethodProperty = new Property();
		deliveryMethodProperty.setType("Property");
		deliveryMethodProperty.setValue("airdrop");

		Property statusProperty = new Property();
		statusProperty.setType("Property");
		statusProperty.setValue(status);


		Map<String, Object> propertyMap = new HashMap<>();
		propertyMap.put("name", nameProperty);
		propertyMap.put("allowedTimeslot", allowedTimeslotProperty);
		propertyMap.put("requestedTimeslot", requestedTimeslotProperty);
		propertyMap.put("deliveryMethod", deliveryMethodProperty);
		propertyMap.put("status", statusProperty);

		Entity delivery = new Entity();
		delivery.setId(URI.create(id));
		delivery.setType("Delivery");
		delivery.setPropertyMap(propertyMap);
		return delivery;

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

	@Then("All transactions for Default are presisted.")
	public void verify_default_tx() throws Exception {
		verifyTransactionsForAccount(defaultExpectedTxMap, "Default");
	}

	@Then("All transactions for Mira are presisted.")
	public void verify_mira_tx() throws Exception {
		verifyTransactionsForAccount(miraExpectedTxMap, "Mira");
	}

	@Then("All transactions for Franzi are presisted.")
	public void verify_franzi_tx() throws Exception {
		verifyTransactionsForAccount(franziExpectedTxMap, "Franzi");
	}

	private void verifyTransactionsForAccount(Map<String, Integer> expectedMap, String accountName) {
		assertFalse(expectedMap.isEmpty(), "We should have at least some expectations.");
		expectedMap.forEach((k, v) -> {
			List<TxDetails> entityResponses = new ArrayList<>();
			// the entity should eventually be available in the blockchain
			Awaitility.await().atMost(TX_AWAIT_MAX_S, TimeUnit.SECONDS).until(() -> {
				EntityTransactions entityTransactions = getTransactionsForEntity(k);
				if (!entityTransactions.getTxDetails().isEmpty()) {
					entityResponses.addAll(entityTransactions.getTxDetails().stream()
							.map(ob -> OBJECT_MAPPER.convertValue(ob, TxDetails.class))
							.filter(txd -> txd.getFrom().equalsIgnoreCase(TEST_ACCOUNT_MAP.get(accountName).getPublicKey()))
							.collect(Collectors.toList()));
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
		Request request;
		if (ethAccount == "Default") {
			request = new Request.Builder()
					.addHeader("NGSILD-Tenant", NGSILD_TENANT)
					.url(String.format("http://%s/ngsi-ld/v1/entities/", CANIS_MAJOR_ADDRESS))
					.method("POST", requestBody)
					.addHeader("Content-Type", "application/json")
					.build();
		} else {
			request = new Request.Builder()
					.addHeader("NGSILD-Tenant", NGSILD_TENANT)
					.addHeader("Wallet-Type", "Vault")
					.addHeader("Wallet-Address", "http://vault:8200/v1/ethereum/accounts/" + ethAccount.toLowerCase(Locale.ROOT))
					.addHeader("Wallet-Token", VAULT_ROOT_TOKEN)
					.url(String.format("http://%s/ngsi-ld/v1/entities/", CANIS_MAJOR_ADDRESS))
					.method("POST", requestBody)
					.addHeader("Content-Type", "application/json")
					.build();
		}


		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(200, response.code(), "We expect a successful response.");
		addTxToExpectations(ethAccount, entity.getId().toString());
	}

	private void addTxToExpectations(String ethAccount, String id) {
		if (expectedTxMap.containsKey(id)) {
			expectedTxMap.put(id, expectedTxMap.get(id) + 1);
		} else {
			expectedTxMap.put(id, 1);
		}

		switch (ethAccount) {
			case "Default": {
				if (defaultExpectedTxMap.containsKey(id)) {
					defaultExpectedTxMap.put(id, defaultExpectedTxMap.get(id) + 1);
				} else {
					defaultExpectedTxMap.put(id, 1);
				}
				break;
			}
			case "Mira": {
				if (miraExpectedTxMap.containsKey(id)) {
					miraExpectedTxMap.put(id, miraExpectedTxMap.get(id) + 1);
				} else {
					miraExpectedTxMap.put(id, 1);
				}
				break;
			}
			case "Franzi": {
				if (franziExpectedTxMap.containsKey(id)) {
					franziExpectedTxMap.put(id, franziExpectedTxMap.get(id) + 1);
				} else {
					franziExpectedTxMap.put(id, 1);
				}
				break;
			}

		}
	}


}
