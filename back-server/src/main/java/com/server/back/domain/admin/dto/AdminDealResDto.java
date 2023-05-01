package com.server.back.domain.admin.dto;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.entity.DealEntity;
import com.server.back.domain.bank.entity.BankEntity;
import com.server.back.domain.stock.entity.DealStockEntity;
import com.server.back.domain.stock.entity.StockEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AdminDealResDto
{
    private Long dealId;
    private String dealCode;
    private String account;
    private DealType dealType;
    private Long price;
    private LocalDateTime createAt;
    private Long marketId;
    private String companyName;
    private String companyKind;
    private Integer stockAmount;
    private Long interest;
    private IsCompleted isCompleted;
    private static AdminDealResDto fromEntity(DealEntity dealEntity) {
        if(DealStockEntity.class.isInstance(dealEntity)){
            DealStockEntity dealStockEntity = (DealStockEntity) dealEntity;
            return AdminDealResDto.builder()
                    .dealId(dealStockEntity.getId())
                    .dealCode("주식")
                    .account(dealStockEntity.getUser().getAccount())
                    .dealType(dealStockEntity.getDealType())
                    .price(dealStockEntity.getPrice())
                    .createAt(dealStockEntity.getCreatedAt())
                    .companyName(dealStockEntity.getStock().getCompany().getName())
                    .companyKind(dealStockEntity.getStock().getCompany().getKind())
                    .stockAmount(dealStockEntity.getStockAmount())
                    .build();

        }else if(BankEntity.class.isInstance(dealEntity)){
            BankEntity bankEntity = (BankEntity) dealEntity;
            return AdminDealResDto.builder()
                    .dealId(bankEntity.getId())
                    .dealCode("은행")
                    .account(bankEntity.getUser().getAccount())
                    .dealType(bankEntity.getDealType())
                    .price(bankEntity.getPrice())
                    .createAt(bankEntity.getCreatedAt())
                    .interest(bankEntity.getInterest())
                    .isCompleted(bankEntity.getIsCompleted())
                    .build();
        }else{
            return AdminDealResDto.builder()
                    .dealId(dealEntity.getId())
                    .dealCode("일반")
                    .account(dealEntity.getUser().getAccount())
                    .dealType(dealEntity.getDealType())
                    .price(dealEntity.getPrice())
                    .createAt(dealEntity.getCreatedAt())
                    .build();
        }
    }
    public static List<AdminDealResDto> fromEntityList(List<DealEntity> dealEntityList) {
        return dealEntityList.stream().map(AdminDealResDto::fromEntity).collect(Collectors.toList());
    }

}
