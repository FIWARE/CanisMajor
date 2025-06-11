package it.pojo;

import lombok.Data;

// This class contains the field of an address
@Data
public class Address { 
	private String streetAddress;
	private String addressRegion;
	private String adressLocality;
	private String postalCode;
}
