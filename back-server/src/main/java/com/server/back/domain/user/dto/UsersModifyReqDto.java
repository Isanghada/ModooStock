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
    private String introduction;

    public UserEntity toEntity(UserEntity user) {
        return UserEntity.builder()
                .id(user.getId())
                .account(user.getAccount())
                .nickname(nickname)
                .password(password)
                .profileImagePath(user.getProfileImagePath())
                .introduction(introduction)
                .isDeleted(user.getIsDeleted())
                .currentMoney(user.getCurrentMoney())
                .build();
    }
}
