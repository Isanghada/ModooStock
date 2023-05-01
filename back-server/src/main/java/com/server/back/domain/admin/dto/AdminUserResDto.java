package com.server.back.domain.admin.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AdminUserResDto {
    private Long userId;
    private String account;
    private String nickname;
    private String introduction;

    public static AdminUserResDto fromEntity(UserEntity user) {
        return AdminUserResDto.builder()
                .userId(user.getId())
                .account(user.getAccount())
                .nickname(user.getNickname())
                .introduction(user.getIntroduction())
                .build();
    }

    public static List<AdminUserResDto> fromEntityList(List<UserEntity> userList){
        return userList.stream().map(AdminUserResDto::fromEntity).collect(Collectors.toList());
    }
}