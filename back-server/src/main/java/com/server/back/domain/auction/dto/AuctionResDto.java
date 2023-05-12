package com.server.back.domain.auction.dto;

import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.user.dto.UserInfoResDto;
import com.server.back.domain.user.entity.UserEntity;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AuctionResDto {
    private Long auctionId;
    private AssetResDto assetResDto;
    private String account;
    private String nickname;
    private Long price;

    public static AuctionResDto fromEntity(AuctionEntity auction){
        AssetResDto assetResDto=AssetResDto.fromEntity(auction.getUserAsset().getAsset());
        UserEntity userEntity = auction.getUserAsset().getUser();
        return  AuctionResDto.builder()
                .auctionId(auction.getId())
                .assetResDto(assetResDto)
                .account(userEntity.getAccount())
                .nickname(userEntity.getNickname())
                .price(auction.getAuctionPrice())
                .build();
    }
    public static List<AuctionResDto> fromEntityList(List<AuctionEntity> auctionList ){
        return auctionList.stream().map(AuctionResDto::fromEntity).collect(Collectors.toList());
    }

}
