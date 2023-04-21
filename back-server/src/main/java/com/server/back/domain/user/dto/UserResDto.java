package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class UserResDto {
    private String account;
    private String nickname;
    private String profileImagePath;

    public static UserResDto fromEntity(UserEntity user) {
        return UserResDto.builder()
                .account(user.getAccount())
                .nickname(user.getNickname())
                .profileImagePath(user.getProfileImagePath())
                .build();
    }

    public static List<UserResDto> fromEnityList( List<UserEntity> userList ){
        return userList.stream().map(UserResDto::fromEntity).collect(Collectors.toList());
    }
}
