package org.fiware.canismajor.repository;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.configuration.GeneralProperties;
import org.fiware.canismajor.exception.NGSIConnectException;
import org.fiware.canismajor.mapping.TxReceiptMapper;
import org.fiware.canismajor.model.EntityTransactionListVO;
import org.fiware.canismajor.model.EntityTransactionVO;
import org.fiware.canismajor.model.TransactionReceiptVO;
import org.fiware.ngsi.api.EntitiesApiClient;
import org.fiware.ngsi.model.EntityListVO;
import org.fiware.ngsi.model.EntityVO;

import javax.inject.Singleton;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.stream.Collectors;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class EntityRepository {

	private static final String REF_QUERY_TEMPLATE = TxReceiptMapper.REF_ENTITY_KEY + "==\"%s\"";

	private final GeneralProperties generalProperties;
	private final EntitiesApiClient apiClient;
	private final TxReceiptMapper txReceiptMapper;

	public EntityTransactionListVO getEntitiesWithTransaction() throws NGSIConnectException {
		Optional<EntityListVO> entityVOS = executeRequest(
				() -> apiClient.queryEntities(generalProperties.getNgsiTenant(), null, null, TxReceiptMapper.ENTITY_TYPE, null, null, null, null, null, null, null, null, null, getLinkHeader()));
		if (entityVOS.isEmpty()) {
			return new EntityTransactionListVO();
		}

		Map<String, List<TransactionReceiptVO>> entityTxMap = entityVOS.get().stream().collect(
				Collectors.toMap(
						txReceiptMapper::getEntityIdFromTX,
						evo -> {
							List<TransactionReceiptVO> txList = new ArrayList<>();
							txList.add(txReceiptMapper.entityVoToTransactionReceiptVo(evo));
							return txList;
						},
						(txList1, txList2) -> {
							txList1.addAll(txList2);
							return txList1;
						}
				));
		EntityTransactionListVO entityTransactionVOS = new EntityTransactionListVO();
		entityTransactionVOS.setRecords(
				entityTxMap
						.entrySet()
						.stream()
						.map(entry -> new EntityTransactionVO().entityId(URI.create(entry.getKey())).txDetails(entry.getValue()))
						.collect(Collectors.toList()));
		entityTransactionVOS.setCount((long) entityTransactionVOS.records().size());
		entityTransactionVOS.setOffset(0l);
		entityTransactionVOS.setLimit(1000l);
		return entityTransactionVOS;
	}

	public EntityTransactionVO getEntityTransactions(URI entityId) throws NGSIConnectException {
		Optional<EntityListVO> optionalEntityListVO = executeRequest(
				() -> apiClient.queryEntities(generalProperties.getNgsiTenant(), null, null, TxReceiptMapper.ENTITY_TYPE, null, String.format(REF_QUERY_TEMPLATE, entityId), null, null, null, null, null, null, null, getLinkHeader()));
		if (optionalEntityListVO.isPresent()) {
			return new EntityTransactionVO()
					.entityId(entityId)
					.txDetails(
							optionalEntityListVO.get()
									.stream()
									.map(txReceiptMapper::entityVoToTransactionReceiptVo)
									.collect(Collectors.toList())
					);
		} else {
			Optional<EntityVO> optionalEntityVO = executeRequest(
					() -> apiClient.retrieveEntityById(generalProperties.getNgsiTenant(), entityId, null, null, null, getLinkHeader()));
			return optionalEntityVO
					.map(entityVO -> new EntityTransactionVO().entityId(entityId))
					.orElseThrow(() -> new NoSuchElementException("The requested entity does not exist."));
		}
	}

	// Helper method to execute calls to the broker and handle possible exceptions.
	private <T> Optional<T> executeRequest(Callable<HttpResponse<T>> request) throws NGSIConnectException {
		HttpResponse<T> response;
		try {
			response = request.call();
		} catch (Exception e) {
			throw new NGSIConnectException("Was not able to query entities. Something unexpected happend.", e);
		}
		if (response.status() != HttpStatus.OK) {
			throw new NGSIConnectException(String.format("Was not able to query entities. Status: %s.", response.getStatus()));
		}
		return response.getBody();
	}

	private String getLinkHeader() {
		return String.format("<%s>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json", TxReceiptMapper.CONTEXT);
	}
}
