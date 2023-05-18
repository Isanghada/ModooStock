package com.server.back.exception;


import com.server.back.common.code.dto.ResultEnum;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;


@Getter
@Builder
public class ErrorResponse {

	private final LocalDateTime timestamp = LocalDateTime.now();
	private final int status;
	private final String error;
	private final String code;
	private final String message;
	private final ResultEnum result = ResultEnum.FAIL;


	public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
		return ResponseEntity
			.status(errorCode.getHttpStatus())
			.body(ErrorResponse.builder()
				.status(errorCode.getHttpStatus().value())
				.error(errorCode.getHttpStatus().name())
				.code(errorCode.name())
				.message(errorCode.getMessage())
				.build()
			);
	}

}
