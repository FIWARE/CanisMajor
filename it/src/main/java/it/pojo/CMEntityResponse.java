package it.pojo;

import lombok.Data;

@Data
public class CMEntityResponse {
	private long id;
	private String entityId;
	private Object txDetails;
}
