package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.ExchangeEntity;
import com.server.back.domain.stock.entity.MaterialEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ExchangeResDto {
    String nationalCode;
    LocalDate date;

    Integer price;

    public static ExchangeResDto fromEntity(ExchangeEntity exchange) {
        return ExchangeResDto.builder()
                .nationalCode(exchange.getNationalCode())
                .date(exchange.getDate())
                .price(exchange.getPrice())
                .build();
    }

    public static List<ExchangeResDto> fromEntityList(List<ExchangeEntity> exchange) {
        return exchange.stream().map(ExchangeResDto::fromEntity).collect(Collectors.toList());
    }
}
