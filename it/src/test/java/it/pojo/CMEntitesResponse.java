package it.pojo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CMEntitesResponse {

	private long offset;
	private long limit;
	private long count;
	private List<CMEntityResponse> records = new ArrayList<>();
}
