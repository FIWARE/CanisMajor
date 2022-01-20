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
import it.pojo.DLTTokenRequest;
import it.pojo.DLTTokenResponse;
import it.pojo.Entity;
import it.pojo.Oauth2Response;
import it.pojo.Property;
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
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class StepDefinitions {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	{
		OBJECT_MAPPER.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	private static final String CANIS_MAJOR_ADDRESS = "localhost:4000";
	private static final String KEYROCK_ADDRESS = "localhost:3005";
	private static final String PEP_PROXY_ADDRESS = "localhost:1027";
	private static final String ORION_ADDRESS = "localhost:1026";

	private static final String CANIS_MAJOR_PUBLIC_KEY = "0x3423f4d100f8646aaF6829cE32Cf801996f7007B";
	private static final String CANIS_MAJOR_PRIVATE_KEY = "0x6e8f202ae50d774850d0678fb83a730e501ada8d2a6cda5851cdb42b27a4f45b";

	private static final String KEYROCK_APP_AUTH = "Basic dHV0b3JpYWwtZGNrci1zaXRlLTAwMDAteHByZXNzd2ViYXBwOnR1dG9yaWFsLWRja3Itc2l0ZS0wMDAwLWNsaWVudHNlY3JldA";

	private static final String TEST_USERNAME = "alice-the-admin@test.com";
	private static final String TEST_PASSWORD = "test";

	// we use testCount for the tests, so that we dont need to empty the blockchain all the time
	// we start at a random point, to be able to run multiple times in local testing.
	private int testCounter = (int)(Math.random() * 10000);


	Map<String, Integer> expectedTxMap = new HashMap<>();

	@Before
	public void setup() throws Exception {
		testCounter++;
		expectedTxMap = new HashMap<>();
	}

	@Given("CanisMajor is running and available for requests.")
	public void setup_sidecar_in_docker() throws Exception {
		Awaitility
				.await()
				.atMost(Duration.of(60, ChronoUnit.SECONDS))
				.until(() -> assertSystemIsRunning());
	}

	private boolean assertSystemIsRunning() {
		// since the setup is relatively complex and does require root-permission, we only check that it is running here.
		Request request = new Request.Builder()
				.url(String.format("http://%s/version", CANIS_MAJOR_ADDRESS))
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();

		try {
			assertEquals(200, okHttpClient.newCall(request).execute().code(), "We expect the setup to run before starting.");
			return true;
		} catch (Exception e) {
			// in case of an exception we assume the system is not reachable yet.
			return false;
		}
	}

	@When("The test-store is created.")
	public void create_test_store() throws Exception {
		String accessToken = getOauthToken();
		String dltToken = getDLTToken();

		Address address = new Address();
		address.setStreetAddress("Via Cascata 1");
		address.setAdressLocality("Partschins");
		address.setAddressRegion("Autonome Provinz Bozen");
		address.setPostalCode("39020");

		Entity testStore = getStore(String.format("urn:ngsi-ld:Building:%s", testCounter), address);
		createEntity(accessToken, dltToken, testStore);
	}

	@When("The test-store is updated.")
	public void update_test_store() throws Exception {
		String accessToken = getOauthToken();
		String dltToken = getDLTToken();

		Address address = new Address();
		address.setStreetAddress("Via S. Valentino 51/A");
		address.setAdressLocality("Meran");
		address.setAddressRegion("Autonome Provinz Bozen");
		address.setPostalCode("39012");

		String storeID = String.format("urn:ngsi-ld:Building:%s", testCounter);

		Entity testStore = getStore(storeID, address);

		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(testStore), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("X-Auth-Token", accessToken)
				.addHeader("DLT-Token", dltToken)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s/attrs", PEP_PROXY_ADDRESS, storeID))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertTrue(response.code() >= 200 && response.code() < 300, "We expect any kind of successful response.");
		addTxToExpectations(storeID);
	}


	@When("The test-store is deleted.")
	public void delete_test_store() throws Exception {
		String accessToken = getOauthToken();
		String dltToken = getDLTToken();

		Request request = new Request.Builder()
				.addHeader("X-Auth-Token", accessToken)
				.addHeader("DLT-Token", dltToken)
				.url(String.format("http://%s/ngsi-ld/v1/entities/%s", PEP_PROXY_ADDRESS, String.format("urn:ngsi-ld:Building:%s", testCounter)))
				.method("DELETE", null)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(204, response.code(), "We expect the entity to be deleted.");
		addTxToExpectations(String.format("urn:ngsi-ld:Building:%s", testCounter));
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

	@When("Another entity is created.")
	public void create_another_entity() throws Exception {
		String accessToken = getOauthToken();
		String dltToken = getDLTToken();

		Address address = new Address();
		address.setStreetAddress("Bernhardstraße 16");
		address.setAdressLocality("Dresden");
		address.setAddressRegion("Saxony");
		address.setPostalCode("01069");

		Entity testStore = getStore(String.format("urn:ngsi-ld:Building:%s-1", testCounter), address);
		createEntity(accessToken, dltToken, testStore);

	}

	@Then("All transactions should be in CanisMajor.")
	public void assert_all_tx_stored() throws Exception {
		assertFalse(expectedTxMap.isEmpty(), "We should have at least some expectations.");
		expectedTxMap.forEach((k,v) -> {
			List<CMEntityResponse> entityResponses = new ArrayList<>();
			// the entity should eventually be available in the blockchain
			Awaitility.await().atMost(5, TimeUnit.SECONDS).until(() -> {
				List<CMEntityResponse> cmEntityResponses = getTransactionsForEntity(k);
				if (!cmEntityResponses.isEmpty()) {
					entityResponses.addAll(cmEntityResponses);
					return true;
				}
				return false;
			});
			assertEquals(v, entityResponses.size(), String.format("%s transactions where expected for %s.", v, k));
		});
	}

	@Then("The transaction to persist test-store can be read through CanisMajor.")
	public void get_test_store() throws Exception {
		List<CMEntityResponse> entityResponses = new ArrayList<>();

		// the entity should eventually be available in the blockchain
		Awaitility.await().atMost(5, TimeUnit.SECONDS).until(() -> {
			List<CMEntityResponse> cmEntityResponses = getTransactionsForEntity(String.format("urn:ngsi-ld:Building:%s", testCounter));
			if (!cmEntityResponses.isEmpty()) {
				entityResponses.addAll(cmEntityResponses);
				return true;
			}
			return false;
		});

		assertEquals(1, entityResponses.size(),
				"Only one such transaction should exist."
		);

		long txId = entityResponses.get(0).getId();

		Request request = new Request.Builder()
				// we can only request by db id
				.url(String.format("http://%s/entity/%s", CANIS_MAJOR_ADDRESS, txId))
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(200, response.code(), "We expect a successful response.");
		CMEntityResponse cmEntityResponse = OBJECT_MAPPER.readValue(response.body().string(), CMEntityResponse.class);
		assertEquals(String.format("urn:ngsi-ld:Building:%s", testCounter), cmEntityResponse.getEntityId());
	}

	@Then("Only one transaction should be persisted for the entity.")
	public void assert_only_one_transaction() throws Exception {
		List<CMEntityResponse> entityResponses = new ArrayList<>();

		// the entity should eventually be available in the blockchain
		Awaitility.await().atMost(5, TimeUnit.SECONDS).until(() -> {
			List<CMEntityResponse> cmEntityResponses = getTransactionsForEntity(String.format("urn:ngsi-ld:Building:%s", testCounter));
			if (!cmEntityResponses.isEmpty()) {
				entityResponses.addAll(cmEntityResponses);
				return true;
			}
			return false;
		});

		assertEquals(1, entityResponses.size(),
				"Only one such transaction should exist."
		);
	}

	private List<CMEntityResponse> getTransactionsForEntity(String entityId) throws Exception {
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

		return cmEntityResponse.getRecords().stream()
				.filter(cmer -> cmer.getEntityId().equals(entityId))
				.collect(Collectors.toList());
	}


	private void createEntity(String accessToken, String dltToken, Entity entity) throws Exception {
		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(entity), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.addHeader("X-Auth-Token", accessToken)
				.addHeader("DLT-Token", dltToken)
				.url(String.format("http://%s/ngsi-ld/v1/entities/", PEP_PROXY_ADDRESS))
				.method("POST", requestBody)
				.addHeader("Content-Type", "application/json")
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(201, response.code(), "We expect a successful response.");
		addTxToExpectations(entity.getId().toString());
		return;
	}

	private void addTxToExpectations(String id) {
		if (expectedTxMap.containsKey(id)) {
			expectedTxMap.put(id, expectedTxMap.get(id)+1);
		} else {
			expectedTxMap.put(id, 1);
		}
	}

	private String getDLTToken() throws Exception {
		DLTTokenRequest dltTokenRequest = new DLTTokenRequest();
		dltTokenRequest.setPublic_key(CANIS_MAJOR_PUBLIC_KEY);
		dltTokenRequest.setPrivate_key(CANIS_MAJOR_PRIVATE_KEY);
		RequestBody requestBody = RequestBody.create(OBJECT_MAPPER.writeValueAsString(dltTokenRequest), MediaType.get("application/json"));

		Request request = new Request.Builder()
				.url(String.format("http://%s/token", CANIS_MAJOR_ADDRESS))
				.method("POST", requestBody)
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(200, response.code(), "We expect a successful response.");
		DLTTokenResponse dltTokenResponse = OBJECT_MAPPER.readValue(response.body().string(), DLTTokenResponse.class);

		return dltTokenResponse.getDltToken();
	}

	private String getOauthToken() throws Exception {

		RequestBody requestBody = RequestBody.create(String.format("username=%s&password=%s&grant_type=password", TEST_USERNAME, TEST_PASSWORD), MediaType.get("application/x-www-form-urlencoded"));

		Request request = new Request.Builder()
				.url(String.format("http://%s/oauth2/token", KEYROCK_ADDRESS))
				.header("Authorization", KEYROCK_APP_AUTH)
				.method("POST", requestBody)
				.build();
		OkHttpClient okHttpClient = new OkHttpClient();
		Response response = okHttpClient.newCall(request).execute();
		assertEquals(200, response.code(), "We expect a successful response.");
		Oauth2Response oauth2Response = OBJECT_MAPPER.readValue(response.body().string(), Oauth2Response.class);

		return oauth2Response.getAccess_token();
	}
}
