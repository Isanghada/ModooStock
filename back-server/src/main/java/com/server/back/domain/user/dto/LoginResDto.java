package com.server.back.domain.user.dto;


import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class LoginResDto {
	private String accessToken;
	private String refreshToken;

	public static LoginResDto fromEntity(String accessToken, String refreshToken) {
		return LoginResDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

}
