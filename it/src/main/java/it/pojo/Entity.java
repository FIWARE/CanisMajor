package it.pojo;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.net.URI;
import java.util.Map;

// This class represents a generic entity with flexible properties
@Data
public class Entity {
	@JsonProperty("@context")
	private Object atContext = null;
	private URI id;
	private String type;
	private Map<String, Object> propertyMap;

	@JsonAnyGetter
	public Map<String, Object> getPropertyMap() {
		return propertyMap;
	}

	@JsonAnySetter
	public void setPropertyMap(Map<String, Object> additionalProperties) {
		this.propertyMap = additionalProperties;
	}


}
