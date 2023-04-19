package com.server.back.domain.auction.dto;

import com.server.back.domain.store.dto.AssetResDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuctionResDto {
    private AssetResDto assetResDto;
    private int price;

    public AuctionResDto from(){
        return  AuctionResDto.builder().build();
    }
}
