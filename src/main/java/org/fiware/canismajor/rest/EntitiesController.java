package org.fiware.canismajor.rest;


import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.api.EntityApi;
import org.fiware.canismajor.exception.NGSIConnectException;
import org.fiware.canismajor.model.EntityTransactionListVO;
import org.fiware.canismajor.model.EntityTransactionVO;
import org.fiware.canismajor.repository.EntityRepository;

import java.net.URI;
import java.util.NoSuchElementException;

@Slf4j
@Controller
@RequiredArgsConstructor
// This class is used to retrieve entities with transactions from the NGSI-LD context broker
public class EntitiesController implements EntityApi {

	private final EntityRepository entityRepository;

	@Override
	// This method retrieves all entities with transactions from the NGSI-LD context broker
	public HttpResponse<EntityTransactionListVO> getEntitiesWithTransactions() {
		try {
			return HttpResponse.ok(entityRepository.getEntitiesWithTransaction());
		} catch (NGSIConnectException e) {
			return HttpResponse.status(HttpStatus.BAD_GATEWAY);
		}
	}

	@Override
	// This method retrieves a specific entity with transactions from the NGSI-LD context broker
	public HttpResponse<EntityTransactionVO> getEntityWithTransactions(URI entityId) {
		try {
			return HttpResponse.ok(entityRepository.getEntityTransactions(entityId));
		} catch (NGSIConnectException e) {
			return HttpResponse.status(HttpStatus.BAD_GATEWAY);
		} catch (NoSuchElementException e) {
			return HttpResponse.status(HttpStatus.NOT_FOUND);
		}
	}
}
