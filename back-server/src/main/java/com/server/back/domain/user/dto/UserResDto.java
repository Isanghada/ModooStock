package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class UserResDto {
    private String account;
    private String nickname;
    private String profileImagePath;

    public static UserResDto fromEntity(UserEntity xx) {
        return UserResDto.builder().build();
    }

    public static List<UserResDto> fromEnityList( List<UserEntity> xxList ){
        List<UserResDto> result = new ArrayList<>();
        for( UserEntity xx : xxList ) {
            UserResDto xxResponseDto = UserResDto.fromEntity( xx );
            result.add(xxResponseDto);
        }
        return result;
    }
}
