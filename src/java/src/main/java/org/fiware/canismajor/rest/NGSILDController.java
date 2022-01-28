package org.fiware.canismajor.rest;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.api.NgsiLdApi;
import org.fiware.canismajor.configuration.GeneralProperties;
import org.fiware.canismajor.dlt.EthereumService;
import org.fiware.canismajor.exception.TokenException;
import org.fiware.canismajor.exception.TransactionException;
import org.fiware.canismajor.mapping.TxReceiptMapper;
import org.fiware.canismajor.model.EntityFragmentVO;
import org.fiware.canismajor.model.EntityVO;
import org.fiware.canismajor.persistence.ConfigurationRepository;
import org.fiware.canismajor.token.DLTToken;
import org.fiware.canismajor.token.TokenService;
import org.fiware.ngsi.api.EntitiesApiClient;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.net.URI;

@Slf4j
@Controller
@RequiredArgsConstructor
public class NGSILDController implements NgsiLdApi {

	private final EthereumService ethereumService;
	private final TokenService tokenService;
	private final EntitiesApiClient entitiesApi;
	private final TxReceiptMapper receiptMapper;
	private final GeneralProperties generalProperties;

	private final ConfigurationRepository configurationRepository;

	@Override
	public HttpResponse<Object> createNgsiLDEntity(@NotNull String dltTokenString, @Nullable String link, EntityVO entityVO) {
		String entityType = entityVO.getType();
//		Optional<ContextConfiguration> contextConfiguration = configurationRepository.findByEntityType(entityType);
//		if (contextConfiguration.isEmpty()) {
//			return HttpResponse.notFound();
//		}
		try {
			DLTToken dltToken = tokenService.decryptToken(dltTokenString);
			Credentials credentials = ethereumService.toAccount(dltToken.privateKey());
			TransactionReceipt transactionReceipt = ethereumService.createAsset(credentials, entityVO);
			entitiesApi.createEntity(generalProperties.getNgsiTenant(), receiptMapper.transactionReceiptToEntityVO(transactionReceipt, entityVO.id()));
			return HttpResponse.ok(transactionReceipt);
		} catch (TokenException e) {
			log.warn("Received an invalid dlt-token.", e);
			return HttpResponse.status(HttpStatus.FORBIDDEN);
		} catch (TransactionException e) {
			log.warn("Was not able to submit transaction.", e);
			return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public HttpResponse<Object> postUpdateNgsiLDEntity(@NotNull String dltTokenString, URI entityId, @Nullable String link, EntityFragmentVO entityFragmentVO) {
		try {
			DLTToken dltToken = tokenService.decryptToken(dltTokenString);
			Credentials credentials = ethereumService.toAccount(dltToken.privateKey());
			TransactionReceipt transactionReceipt = ethereumService.updateAsset(credentials, entityId, entityFragmentVO);
			entitiesApi.createEntity(generalProperties.getNgsiTenant(), receiptMapper.transactionReceiptToEntityVO(transactionReceipt, entityId));
			return HttpResponse.ok(transactionReceipt);
		} catch (TokenException e) {
			log.warn("Received an invalid dlt-token.", e);
			return HttpResponse.status(HttpStatus.FORBIDDEN);
		} catch (TransactionException e) {
			log.warn("Was not able to submit transaction.", e);
			return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
