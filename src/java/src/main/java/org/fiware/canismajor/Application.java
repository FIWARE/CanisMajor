package org.fiware.canismajor;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import io.micronaut.runtime.Micronaut;
import org.fiware.canismajor.configuration.GeneralProperties;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

/**
 * Base application as starting point
 */
@Factory
public class Application {

	public static void main(String[] args) {
		Micronaut.run(Application.class, args);
	}

	@Bean
	public Web3j ethereumClient(GeneralProperties generalProperties) {
		return Web3j.build(new HttpService(generalProperties.getDltAddress().toString()));
	}

	@Bean
	public ContractGasProvider contractGasProvider(GeneralProperties generalProperties) {
		return new StaticGasProvider(generalProperties.getGasPrice(), generalProperties.getGas());
	}
}
