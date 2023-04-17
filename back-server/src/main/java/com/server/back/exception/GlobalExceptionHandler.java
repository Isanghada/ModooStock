package com.server.back.exception;


import lombok.extern.log4j.Log4j2;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static com.server.back.exception.ErrorCode.DUPLICATE_RESOURCE;


@Log4j2
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	/**
	 * hibernate 관련 Exception
	 */
	@ExceptionHandler(value = { ConstraintViolationException.class, DataIntegrityViolationException.class })
	protected ResponseEntity<ErrorResponse> handleDataException() {
		log.error("handleDataException throw Exception : {}", DUPLICATE_RESOURCE);
		return ErrorResponse.toResponseEntity(DUPLICATE_RESOURCE);
	}


	/**
	 * 사용 방법
	 * 로직 내에서 throw new CustomException(ErrorCode.enum);
	 */
	@ExceptionHandler(value = { CustomException.class })
	protected ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
		log.error("handleCustomException throw CustomException : {}", exception.getErrorCode());
		return ErrorResponse.toResponseEntity(exception.getErrorCode());
	}

}
