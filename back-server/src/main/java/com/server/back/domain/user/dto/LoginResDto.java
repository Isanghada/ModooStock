package com.server.back.domain.user.dto;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class LoginResDto {
	private String accessToken;
	private String refreshToken;
	private String nickname;

	public static LoginResDto fromEntity(String accessToken, String refreshToken, String nickname) {
		return LoginResDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.nickname(nickname)
			.build();
	}

}
