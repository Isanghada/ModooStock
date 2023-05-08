package com.server.back.domain.store.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import lombok.*;

@Data
@Builder
public class AssetResDto {
    private Long assetId;
    private String assetName;
    private String assetImagePath;
    private AssetLevelType assetLevel;
    private String assetCategory;

    public static AssetResDto fromEntity(AssetEntity asset){
        return AssetResDto.builder()
                .assetId(asset.getId())
                .assetName(asset.getAssetName())
                .assetImagePath(asset.getAssetImagePath())
                .assetLevel(asset.getAssetLevel())
                .assetCategory(asset.getCategory())
                .build();
    }

}
