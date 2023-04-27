package com.server.back.domain.user.dto;

import com.server.back.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoLoginResDto {
    private String nickname;
    private Long currentMoney;
    private Float totalStockReturn;

    public static UserInfoLoginResDto fromEntity(UserEntity user, Float totalStockReturn) {
        return UserInfoLoginResDto.builder()
                .nickname(user.getNickname())
                .currentMoney(user.getCurrentMoney())
                .totalStockReturn(totalStockReturn)
        .build();
    }

}
