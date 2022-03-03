package it.pojo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class EntityTransactions {

	private final String entityId;
	private final List<Object> txDetails;
}
