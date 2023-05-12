package com.server.back.domain.storage.dto;

import com.server.back.domain.auction.entity.AuctionEntity;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AuctionHistoryResDto {

    private Long price;
    private LocalDate dealDate;

    public static AuctionHistoryResDto fromEntity(AuctionEntity auction){
        return AuctionHistoryResDto.builder()
                .price(auction.getAuctionPrice())
                .dealDate(auction.getUpdatedAt().toLocalDate())
                .build();
    }

    public static List<AuctionHistoryResDto> fromEntityList(List<AuctionEntity> auctionEntityList){
        return auctionEntityList.stream().map(AuctionHistoryResDto::fromEntity).collect(Collectors.toList());
    }

}
