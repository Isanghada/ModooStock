package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.StockEntity;
import lombok.*;

import java.util.stream.Collectors;
import java.util.List;

@Data
@Builder
public class StockListResDto {
    Long stockId;
    String kind;
    Long price;

    public static StockListResDto fromEntity(StockEntity stock) {
        return StockListResDto.builder().stockId(stock.getId()).kind(stock.getCompany().getKind()).price((long) (stock.getAverage() * 1.75)).build();
    }

    public static List<StockListResDto> fromEntityList(List<StockEntity> stockList) {
        return stockList.stream().map(StockListResDto::fromEntity).collect(Collectors.toList());
    }
}
