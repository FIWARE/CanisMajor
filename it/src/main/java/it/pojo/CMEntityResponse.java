package it.pojo;

import lombok.Data;

// This class Represent a response entity
@Data
public class CMEntityResponse {
	
	private long id;
	private String entityId;
	private Object txDetails;
}
