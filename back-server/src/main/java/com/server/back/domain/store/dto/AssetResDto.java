package com.server.back.domain.store.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import lombok.*;

@Data
@Builder
public class AssetResDto {
    private Long assetId;
    private String assetName;
    private AssetLevelType assetLevel;
    private String assetCategory;
    private String assetNameKor;

    public static AssetResDto fromEntity(AssetEntity asset){
        return AssetResDto.builder()
                .assetId(asset.getId())
                .assetName(asset.getAssetName())
                .assetLevel(asset.getAssetLevel())
                .assetCategory(asset.getCategory())
                .assetNameKor(asset.getAssetNameKor())
                .build();
    }

}
