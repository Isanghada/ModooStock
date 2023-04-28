package com.server.back.domain.admin.dto;

import com.server.back.domain.stock.entity.MarketEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AdminMarketResDto {
    private Long marketId;
    private LocalDateTime createAt;
    private LocalDate startAt;
    private LocalDate endAt;
    private LocalDate gameDate;

    public static AdminMarketResDto fromEntity(MarketEntity marketEntity){
        return AdminMarketResDto.builder()
                .marketId(marketEntity.getId())
                .createAt(marketEntity.getCreatedAt())
                .startAt(marketEntity.getStartAt())
                .endAt(marketEntity.getEndAt())
                .gameDate(marketEntity.getGameDate())
                .build();
    }

    public static List<AdminMarketResDto> fromEntity(List<MarketEntity> marketEntityList){
        return marketEntityList.stream().map(AdminMarketResDto::fromEntity).collect(Collectors.toList());
    }
}
