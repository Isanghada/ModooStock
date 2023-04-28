package com.server.back.domain.admin.dto;

import com.server.back.common.code.commonCode.DealType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminDealResDto
{
    private Long dealId;
    private String dealCode;
    private String account;
    private DealType dealType;
    private Long price;
    private Long marketId;
    private String comapnyName;
    private Integer stockAmount;
    private LocalDateTime createAt;

}
