package it.pojo;

import lombok.Data;

import java.util.List;

// This class is designed to encapsulate error messages
@Data
public class ErrorMessage {

	private List<String> errors;
}
