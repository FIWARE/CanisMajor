package org.fiware.canismajor.mapping;

import org.fiware.canismajor.dlt.vault.VaultTransaction;
import org.mapstruct.Mapper;
import org.web3j.crypto.RawTransaction;

@Mapper(componentModel = "jsr330")
public interface TransactionMapper {

	VaultTransaction rawTransactionToVaultTransaction(RawTransaction rawTransaction);

}
