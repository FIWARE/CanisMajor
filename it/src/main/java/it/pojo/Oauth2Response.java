package it.pojo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Oauth2Response {

	private String access_token;
	private String token_type;
	private long expires_in;
	private String refresh_token;
	private List<String> scope = new ArrayList<>();
}
