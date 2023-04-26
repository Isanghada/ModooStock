package com.server.back.domain.news.dto;

import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.StockEntity;
import lombok.*;

import java.util.List;

@Data
@Builder
public class StockNewsListResDto {

    private List<StockListResDto> stockList;

    private List<DateListResDto> dateList;

    public static StockNewsListResDto fromEntity(List<StockEntity> stockList, List<ChartEntity> stockChartList){
        return StockNewsListResDto.builder()
                .stockList(StockListResDto.fromEntityList(stockList))
                .dateList(DateListResDto.fromEntityList(stockChartList))
                .build();
    }

}
