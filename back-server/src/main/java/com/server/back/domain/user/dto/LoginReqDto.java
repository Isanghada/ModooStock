package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
