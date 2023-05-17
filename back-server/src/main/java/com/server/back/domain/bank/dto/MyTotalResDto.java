package com.server.back.domain.bank.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class MyTotalResDto {
    Long currentMoney;

    public static MyTotalResDto fromEntity(Long currentMoney) {
        return MyTotalResDto.builder().currentMoney(currentMoney).build();
    }

}
