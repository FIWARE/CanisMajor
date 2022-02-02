package org.fiware.canismajor;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.runtime.Micronaut;
import lombok.RequiredArgsConstructor;
import org.fiware.canismajor.configuration.EthereumProperties;
import org.fiware.canismajor.configuration.GeneralProperties;
import org.fiware.canismajor.configuration.IotaProperties;
import org.iota.client.Client;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

/**
 * Base application as starting point
 */
@RequiredArgsConstructor
@Factory
public class Application {

	public static void main(String[] args) {
		Micronaut.run(Application.class, args);
	}

	private final EthereumProperties ethereumProperties;
	private final IotaProperties iotaProperties;

	@Bean
//	@Requires(property = "ethereum.enabled", value = "true")
	public Web3j ethereumClient() {
		return Web3j.build(new HttpService(ethereumProperties.getDltAddress().toString()));
	}

	@Bean
//	@Requires(property = "iota.enabled", value = "true")
	public Client iotaClient() {
		return Client.Builder()
				.withNode(iotaProperties.getNodeUrl())
				.withLocalPow(iotaProperties.isLocalPow())
				.withRequestTimeout(iotaProperties.getRequestTimeout())
				.finish();
	}

	@Bean
//	@Requires(property = "ethereum.enabled", value = "true")
	public ContractGasProvider contractGasProvider() {
		return new StaticGasProvider(ethereumProperties.getGasPrice(), ethereumProperties.getGas());
	}
}
