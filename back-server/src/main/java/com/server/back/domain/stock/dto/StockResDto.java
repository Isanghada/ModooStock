package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.UserDealEntity;
import lombok.*;
import java.util.*;

@Data
@Builder
public class StockResDto {
    private Long stockId;
    private Integer amount;
    private Float average;
    private List<StockChartResDto> stockChartResDto;

    public static StockResDto fromEntity(Long stockId, UserDealEntity userDeal, List<ChartEntity> stockChartList) {
        if (userDeal == null) {
            return StockResDto.builder()
                    .stockId(stockId)
                    .amount(0)
                    .average((float) 0)
                    .stockChartResDto(StockChartResDto.fromEntityList(stockChartList))
                    .build();
        }
        return StockResDto.builder().stockId(userDeal.getStock().getId())
               .amount(userDeal.getTotalAmount())
               .average(userDeal.getAverage())
               .stockChartResDto(StockChartResDto.fromEntityList(stockChartList)).build();
    }
}
