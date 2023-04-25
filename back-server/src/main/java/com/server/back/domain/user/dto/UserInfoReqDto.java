package com.server.back.domain.user.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoReqDto {
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private LocalDate time;
}
