package it.pojo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TestAccount {

	private final String name;
	private final String mnemonic;
}
