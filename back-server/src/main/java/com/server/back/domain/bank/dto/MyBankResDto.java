package com.server.back.domain.bank.dto;

import com.server.back.domain.bank.entity.BankEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.server.back.domain.bank.service.BankServiceImpl.BANK_PERIOD;

@Data
@Builder
public class MyBankResDto {

    Long bankId;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Long price;
    Boolean isPaid;

    public static MyBankResDto fromEntity(BankEntity bank) {
        // 기본으로 은행에 넣었던 돈 얻기
        Long getMoney = bank.getPrice();
        // 만기일
        LocalDateTime endDate = bank.getCreatedAt().plusHours(BANK_PERIOD);

        // 이자 지급 여부
        Boolean isPaid = false;

        // 만기가 지났다면 이자 추가
        if (LocalDateTime.now().isAfter(endDate)){
            getMoney += bank.getInterest();
            isPaid = true;
        }

        return MyBankResDto.builder().bankId(bank.getId()).startDate(bank.getCreatedAt()).endDate(endDate).price(getMoney).isPaid(isPaid).build();
    }

    public static List<MyBankResDto> fromEnityList(List<BankEntity> bankList ){
        return bankList.stream().map(MyBankResDto::fromEntity).collect(Collectors.toList());
    }
}
