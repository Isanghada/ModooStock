package com.server.back.domain.admin.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminUserInfoResDto {
    private Long userId;
    private String nickname;
    private String introduction;
    private String profileImagePath;
    private Long currentMoney;

    public static AdminUserInfoResDto fromEntity(UserEntity user){
        return AdminUserInfoResDto.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .introduction(user.getIntroduction())
                .profileImagePath(user.getProfileImagePath())
                .currentMoney(user.getCurrentMoney())
                .build();
    }
}
