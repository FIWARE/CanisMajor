package org.fiware.canismajor.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.exception.PersistenceException;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;

@Slf4j
@Converter(autoApply = true)
public class JacksonConverter implements AttributeConverter<Object, String> {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(Object attribute) {
		try {
			return OBJECT_MAPPER.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			log.debug("Was not able to translate input object: %s", attribute);
			throw new PersistenceException("Was not able to translate input object.", e);
		}

	}

	@Override
	public Object convertToEntityAttribute(String dbData) {
		if (dbData == null) {
			return null;
		}
		try {
			return OBJECT_MAPPER.readValue(dbData, Object.class);
		} catch (IOException e) {
			log.debug("Was not able to translate db object: %s", dbData);
			throw new PersistenceException("Was not able to translate database object.", e);
		}
	}
}
