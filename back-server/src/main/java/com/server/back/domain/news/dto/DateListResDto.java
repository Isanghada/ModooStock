package com.server.back.domain.news.dto;

import com.server.back.domain.stock.entity.ChartEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class DateListResDto {
    LocalDate date;

    public static DateListResDto fromEntity(ChartEntity chart){
        return DateListResDto.builder()
                .date(chart.getDate())
                .build();
    }
    public static List<DateListResDto> fromEntityList(List<ChartEntity> chartList) {
        return chartList.stream().map(DateListResDto::fromEntity).collect(Collectors.toList());
    }
}
