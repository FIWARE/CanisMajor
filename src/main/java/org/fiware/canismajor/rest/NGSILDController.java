package org.fiware.canismajor.rest;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.api.NgsiLdApi;
import org.fiware.canismajor.configuration.GeneralProperties;
import org.fiware.canismajor.dlt.EthereumService;
import org.fiware.canismajor.dlt.WalletInformation;
import org.fiware.canismajor.dlt.WalletType;
import org.fiware.canismajor.exception.TransactionException;
import org.fiware.canismajor.mapping.TxReceiptMapper;
import org.fiware.canismajor.model.EntityFragmentVO;
import org.fiware.canismajor.model.EntityVO;
import org.fiware.ngsi.api.EntitiesApiClient;
import org.jetbrains.annotations.Nullable;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
public class NGSILDController implements NgsiLdApi {

	private final EthereumService ethereumService;
	private final EntitiesApiClient entitiesApi;
	private final TxReceiptMapper receiptMapper;
	private final GeneralProperties generalProperties;

	@Override
	public HttpResponse<Object> createNgsiLDEntity(@Nullable String link, @Nullable String walletType, @Nullable String walletToken, @Nullable String walletAddress, EntityVO entityVO) {
		try {
			TransactionReceipt transactionReceipt = ethereumService.createAsset(entityVO, toWalletInformation(walletType, walletToken, walletAddress));
			entitiesApi.createEntity(generalProperties.getNgsiTenant(), receiptMapper.transactionReceiptToEntityVO(transactionReceipt, entityVO.id()));
			return HttpResponse.ok(transactionReceipt);
		} catch (TransactionException e) {
			log.warn("Was not able to submit transaction.", e);
			return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public HttpResponse<Object> postUpdateNgsiLDEntity(URI entityId, @Nullable String link, @Nullable String walletType, @Nullable String walletToken, @Nullable String walletAddress, EntityFragmentVO entityFragmentVO) {
		try {
			TransactionReceipt transactionReceipt = ethereumService.updateAsset(entityId, entityFragmentVO, toWalletInformation(walletType, walletToken, walletAddress));
			entitiesApi.createEntity(generalProperties.getNgsiTenant(), receiptMapper.transactionReceiptToEntityVO(transactionReceipt, entityId));
			return HttpResponse.ok(transactionReceipt);
		} catch (TransactionException e) {
			log.warn("Was not able to submit transaction.", e);
			return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private WalletInformation toWalletInformation(String walletType, String walletToken, String walletAddress) {
		try {
			Optional<String> optionalWalletAddress = Optional.ofNullable(walletAddress);
			if (optionalWalletAddress.isPresent()) {
				return new WalletInformation(WalletType.getByValue(walletType), Optional.ofNullable(walletToken), Optional.of(new URL(optionalWalletAddress.get())));
			} else {
				return new WalletInformation(WalletType.getByValue(walletType), Optional.ofNullable(walletToken), Optional.empty());
			}
		} catch (MalformedURLException e) {
			throw new IllegalArgumentException("%s is not a valid walletAddress");
		}
	}
}
