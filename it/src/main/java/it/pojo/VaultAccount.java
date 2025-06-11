package it.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This class models an account with a mnemonic phrase
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaultAccount {

	private String mnemonic;
}
