package com.server.back.domain.comment.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.*;

@Data
@Builder
public class AuthorResDto {
    private String nickname;
    private String profileImagePath;

    public static AuthorResDto fromEntity(UserEntity user){
        return AuthorResDto.builder()
                .nickname(user.getNickname())
                .profileImagePath(user.getProfileImagePath())
                .build();
    }
}
