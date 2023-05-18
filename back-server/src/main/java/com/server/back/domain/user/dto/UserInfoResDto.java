package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoResDto {
    private String nickname;
    private String profileImagePath;
    private String introduction;
    private Long totalCash;

    public static UserInfoResDto fromEntity(UserEntity user, Long totalCash) {
        return UserInfoResDto.builder()
                .nickname(user.getNickname())
                .profileImagePath(user.getProfileImagePath())
                .introduction(user.getIntroduction())
                .totalCash(totalCash)
                .build();
    }
}
