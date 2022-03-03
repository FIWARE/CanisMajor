package it.pojo;

import lombok.Data;

import java.util.List;

@Data
public class ErrorMessage {

	private List<String> errors;
}
