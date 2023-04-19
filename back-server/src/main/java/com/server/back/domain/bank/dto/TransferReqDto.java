package com.server.back.domain.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferReqDto {
    private String sender;
    private String receiver;
    private Integer money;
}
