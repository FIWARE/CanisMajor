package org.fiware.canismajor.dlt.vault;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VaultResponse {

	@JsonProperty("request_id")
	private String requestId;

	@JsonProperty("lease_id")
	private String leaseId;
	private boolean renewable;

	@JsonProperty("lease_duration")
	private long leaseDuration;

	private Object data;

	@JsonProperty("wrap_info")
	private String warpInfo;

	private String warnings;
	private String auth;
}
