package it.pojo;

import lombok.Data;

@Data
public class Address {

	private String streetAddress;
	private String addressRegion;
	private String adressLocality;
	private String postalCode;
}
