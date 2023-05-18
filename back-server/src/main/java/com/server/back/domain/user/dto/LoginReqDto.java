package com.server.back.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 로그인
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginReqDto {
    private String account;
    private String password;
}
