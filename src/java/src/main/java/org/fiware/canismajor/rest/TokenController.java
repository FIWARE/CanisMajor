package org.fiware.canismajor.rest;


import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.api.TokenApi;
import org.fiware.canismajor.model.DLTTokenVO;
import org.fiware.canismajor.model.TokenKeysVO;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TokenController implements TokenApi {

	@Override
	public HttpResponse<DLTTokenVO> generateToken(TokenKeysVO tokenKeysVO) {
		return null;
	}

	@Override
	public HttpResponse<TokenKeysVO> getTokenInfo(DLTTokenVO dlTTokenVO) {
		return null;
	}
}
