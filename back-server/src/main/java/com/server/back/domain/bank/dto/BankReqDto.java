package com.server.back.domain.bank.dto;

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

    public BankEntity toEntity(BankEntity bank) {
        return (BankEntity) new Object();
    }
}
