package it.pojo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/* This class models a test account with immutable fields
 for the account’s name, mnemonic, and public key.*/ 
@Getter
@RequiredArgsConstructor
public class TestAccount {

	private final String name;
	private final String mnemonic;
	private final String publicKey;
}
