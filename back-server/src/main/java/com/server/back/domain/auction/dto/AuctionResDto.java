package com.server.back.domain.auction.dto;

import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.bank.dto.MyBankListResDto;
import com.server.back.domain.bank.entity.BankEntity;
import com.server.back.domain.store.dto.AssetResDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class AuctionResDto {
    private AssetResDto assetResDto;
    private int price;

    public static AuctionResDto fromEntity(AuctionEntity auction){
        AssetResDto assetResDto=AssetResDto.fromEntity(auction.getUserAsset().getAsset());
        return  AuctionResDto.builder()
                .assetResDto(assetResDto)
                .price(auction.getAuctionPrice())
                .build();
    }
    public static List<AuctionResDto> fromEntityList(List<AuctionEntity> auctionList ){
        return auctionList.stream().map(AuctionResDto::fromEntity).collect(Collectors.toList());
    }

}
