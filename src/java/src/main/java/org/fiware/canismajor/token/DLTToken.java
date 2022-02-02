package org.fiware.canismajor.token;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class DLTToken {
	private final String publicKey;
	private final String privateKey;
}
