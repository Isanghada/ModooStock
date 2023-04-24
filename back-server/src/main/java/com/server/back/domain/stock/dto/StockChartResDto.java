package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.ChartEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class StockChartResDto {
    Integer priceBefore;
    Integer priceEnd;
    LocalDateTime date;
    Long id;
    Long companyId;

    public static StockChartResDto fromEntity(ChartEntity chart) {
        return StockChartResDto.builder().companyId(chart.getCompany().getId())
                .priceEnd(chart.getPriceEnd())
                .priceBefore(chart.getPriceBefore())
                .date(chart.getDate())
                .id(chart.getId()).build();
    }
    public static List<StockChartResDto> fromEntityList(List<ChartEntity> chartList) {
        return chartList.stream().map(StockChartResDto::fromEntity).collect(Collectors.toList());
    }
}
