package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.ChartEntity;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class StockChartResDto {
    Long priceBefore;
    Long priceEnd;
    LocalDate date;
    Long id;
    Long companyId;
    Float changeRate;

    public static StockChartResDto fromEntity(ChartEntity chart) {
        return StockChartResDto.builder().companyId(chart.getCompany().getId())
                .priceEnd(chart.getPriceEnd())
                .priceBefore(chart.getPriceBefore())
                .date(chart.getDate())
                .id(chart.getId())
                .changeRate(chart.getChangeRate())
                .build();
    }
    public static List<StockChartResDto> fromEntityList(List<ChartEntity> chartList) {
        List<StockChartResDto> result = new ArrayList<>();
        ChartEntity prev = null;
        for (ChartEntity curr : chartList) {
            if (prev == null) {
                result.add(StockChartResDto.fromEntity(curr));
            } else {
                Long calculatedPriceEnd = prev.getChangeRate() > 0 ? (long) (curr.getPriceEnd() * prev.getChangeRate()) : curr.getPriceEnd();
                StockChartResDto currDto = StockChartResDto.builder()
                        .companyId(curr.getCompany().getId())
                        .priceEnd(calculatedPriceEnd)
                        .priceBefore(curr.getPriceBefore())
                        .date(curr.getDate())
                        .id(curr.getId())
                        .changeRate(curr.getChangeRate())
                        .build();
                result.add(currDto);
            }
            prev = curr;
        }
        return result;
    }
}
