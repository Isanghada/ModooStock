package com.server.back.domain.mypage.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.domain.store.entity.UserAssetEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class MyAssetResDto {
    private Long userAssetId;
    private String assetImagePath;
    private AssetLevelType assetLevel;
    private String assetCategory;
    private IsAuctioned isAuctioned;

    public static MyAssetResDto fromEntity(UserAssetEntity userAsset){
        return  MyAssetResDto.builder()
                .userAssetId(userAsset.getAsset().getId())
                .assetImagePath(userAsset.getAsset().getAssetImagePath())
                .assetLevel(userAsset.getAsset().getAssetLevel())
                .assetCategory(userAsset.getAsset().getCategory())
                .isAuctioned(userAsset.getIsAuctioned())
                .build();
    }

    public static List<MyAssetResDto> fromEntityList(List<UserAssetEntity> userAssetEntityList ){
        return userAssetEntityList.stream().map(MyAssetResDto::fromEntity).collect(Collectors.toList());
    }


}
