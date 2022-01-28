package org.fiware.canismajor.rest;


import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.token.TokenService;
import org.fiware.canismajor.api.TokenApi;
import org.fiware.canismajor.dlt.EthereumService;
import org.fiware.canismajor.exception.TokenException;
import org.fiware.canismajor.model.DLTTokenVO;
import org.fiware.canismajor.model.TokenKeysVO;

import java.util.Base64;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TokenController implements TokenApi {


	private final EthereumService ethereumService;
	private final TokenService tokenService;

	@Override
	public HttpResponse<DLTTokenVO> generateToken(TokenKeysVO tokenKeysVO) {
		if (!ethereumService.isAddress(tokenKeysVO.getPublicKey())) {
			return HttpResponse.status(HttpStatus.FORBIDDEN);
		}
		// Only required as a validity check.
		ethereumService.toAccount(tokenKeysVO.getPrivateKey());

		try {
			return HttpResponse.ok(new DLTTokenVO().dltToken(tokenService.generateToken(tokenKeysVO.getPrivateKey(), tokenKeysVO.getPublicKey())));
		} catch (TokenException e) {
			log.warn("Was not able to generate Token.", e);
			return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
