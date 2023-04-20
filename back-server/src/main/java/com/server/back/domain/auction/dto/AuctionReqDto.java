package com.server.back.domain.auction.dto;

import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.store.entity.UserAssetEntity;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AuctionReqDto {
    private Long userAssetId;
    private int price;

    public AuctionEntity toEntity(UserAssetEntity userAsset){
        return AuctionEntity.builder()
                .userAsset(userAsset)
                .auctionPrice(price)
                .isCompleted(IsCompleted.N)
                .isDeleted(IsDeleted.N)
                .build();
    }
}
