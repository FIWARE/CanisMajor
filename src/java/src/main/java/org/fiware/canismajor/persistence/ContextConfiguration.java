package org.fiware.canismajor.persistence;

import lombok.Data;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
public class ContextConfiguration {

	@Id
	@GeneratedValue
	private UUID id;

	private String entityType;
	private String contextMapping;
	// we can store it plain json, since we have very little of them and no frequent changes.
	@Convert(converter = JacksonConverter.class)
	private Object metaData;
}
