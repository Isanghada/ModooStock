package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 회원 정보 수정
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersModifyReqDto {
    private String nickname;
    private String password;

    public UserEntity toEntity() {
        return (UserEntity) new Object();
    }
}
