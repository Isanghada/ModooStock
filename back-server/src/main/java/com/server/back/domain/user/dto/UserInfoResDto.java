package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoResDto {
    private String nickname;
    private Integer currentMoney;
    private Float totalStockReturn;

    public static UserInfoResDto fromEntity(UserEntity xx) {
        return UserInfoResDto.builder().build();
    }

}
