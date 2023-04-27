package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.MaterialEntity;
import com.server.back.domain.stock.entity.StockEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class MaterialResDto {
    String standardType;
    LocalDate date;
    Integer price;

    public static MaterialResDto fromEntity(MaterialEntity material) {
        return MaterialResDto.builder()
                .standardType(material.getStandardType())
                .date(material.getDate())
                .price(material.getPrice())
                .build();
    }

    public static List<MaterialResDto> fromEntityList(List<MaterialEntity> material) {
        return material.stream().map(MaterialResDto::fromEntity).collect(Collectors.toList());
    }
}
