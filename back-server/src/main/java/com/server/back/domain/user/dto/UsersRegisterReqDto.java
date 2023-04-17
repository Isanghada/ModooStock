package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.*;

/**
 * 회원가입 요청
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersRegisterReqDto {
    private String account;
    private String nickname;
    private String password;

    public UserEntity toEntity() {
        return (UserEntity) new Object();
    }
}
