package org.fiware.canismajor.dlt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iota.client.Client;
import org.iota.client.NodeInfoWrapper;

import javax.inject.Singleton;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class IotaService {

	private final Client iotaClient;

	public void getInfo() {
		NodeInfoWrapper info = iotaClient.getInfo();
		log.info("Node info: {}", info.nodeInfo());
	}
}
