package it.pojo;

import lombok.Data;

// This class defines a generic data model for a property. 
@Data
public class Property {

	private String type = "Property";
	private Object value = null;
	private Object verified = null;
}
