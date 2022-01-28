package org.fiware.canismajor.configuration;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Data;

import java.util.UUID;

@ConfigurationProperties("encryption")
@Data
public class EncryptionProperties {

	private boolean enabled = false;
	private boolean signTransactions = false;
	private String cmSecret = UUID.randomUUID().toString();
	private String salt = UUID.randomUUID().toString();
	private String algorithm = "AES/CTR/NoPadding";
	private String keyType = "AES";
	private int keyLength = 256;
}
