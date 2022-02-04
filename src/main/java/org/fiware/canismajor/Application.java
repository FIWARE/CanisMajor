package org.fiware.canismajor;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.client.BlockingHttpClient;
import io.micronaut.http.client.netty.DefaultHttpClient;
import io.micronaut.runtime.Micronaut;
import lombok.RequiredArgsConstructor;
import org.fiware.canismajor.configuration.EthereumProperties;
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

	@Bean
	public BlockingHttpClient blockingHttpClient() {
		return new DefaultHttpClient().toBlocking();
	}

	@Bean
	@Requires(property = "ethereum.enabled", value = "true")
	public Web3j ethereumClient() {
		return Web3j.build(new HttpService(ethereumProperties.getDltAddress().toString()));
	}


	@Bean
	@Requires(property = "ethereum.enabled", value = "true")
	public ContractGasProvider contractGasProvider() {
		return new StaticGasProvider(ethereumProperties.getGasPrice(), ethereumProperties.getGas());
	}

}
