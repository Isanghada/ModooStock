package com.server.back.domain.admin.dto;

import com.server.back.domain.stock.entity.StockEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AdminStockResDto {
    private String companyName;
    private Long average;
    public static AdminStockResDto fromEntity(StockEntity stockEntity){
        return AdminStockResDto.builder()
                .companyName(stockEntity.getCompany().getName())
                .average(stockEntity.getAverage())
                .build();
    }
    public static List<AdminStockResDto> fromEntityList(List<StockEntity> stockEntityList){
        return stockEntityList.stream().map(AdminStockResDto::fromEntity).collect(Collectors.toList());
    }
}
