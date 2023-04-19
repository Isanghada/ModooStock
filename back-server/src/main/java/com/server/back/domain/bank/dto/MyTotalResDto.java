package com.server.back.domain.bank.dto;

import com.server.back.domain.bank.entity.BankEntity;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class MyTotalResDto {
    Integer currentMoney;

    public static MyTotalResDto fromEntity(BankEntity bank) {
        return MyTotalResDto.builder().build();
    }

}
