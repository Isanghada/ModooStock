package com.server.back.domain.bank.dto;

import com.server.back.domain.bank.entity.BankEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class MyBankListResDto {
    LocalDateTime startDate;
    LocalDateTime endDate;
    Integer price;

    public static MyBankListResDto fromEntity(BankEntity bank) {
        return MyBankListResDto.builder().build();
    }

    public static List<MyBankListResDto> fromEnityList(List<BankEntity> bankList ){
        return bankList.stream().map(MyBankListResDto::fromEntity).collect(Collectors.toList());
    }
}
