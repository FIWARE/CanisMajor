package it.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DLTTokenResponse {

	@JsonProperty("dlt-token")
	private String dltToken;
}
