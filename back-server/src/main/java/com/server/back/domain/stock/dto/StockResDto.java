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
    private Float rate;
    private List<StockChartResDto> stockChartResDto;

    public static StockResDto fromEntity(Long stockId, Optional<UserDealEntity> userDeal, List<ChartEntity> stockChartList) {
        if (!userDeal.isPresent()) {
            return StockResDto.builder()
                    .stockId(stockId)
                    .amount(0)
                    .average((float) 0)
                    .rate((float) 0)
                    .stockChartResDto(StockChartResDto.fromEntityList(stockChartList))
                    .build();
        }
        return StockResDto.builder().stockId(userDeal.get().getStock().getId())
               .amount(userDeal.get().getTotalAmount())
               .average(userDeal.get().getAverage())
                .rate(userDeal.get().getRate())
               .stockChartResDto(StockChartResDto.fromEntityList(stockChartList)).build();
    }
}
