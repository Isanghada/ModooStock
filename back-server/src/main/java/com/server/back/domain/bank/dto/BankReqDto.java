package com.server.back.domain.bank.dto;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.domain.bank.entity.BankEntity;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankReqDto {
    private Integer price;

    public BankEntity toEntity(UserEntity user) {
        return BankEntity.builder()
                .user(user)
                .price(price)
                .dealType(DealType.LOSE_MONEY_FOR_DEPOSIT)
                .interest((int) Math.round(price * 0.01))
                .build();
    }
}
