package com.server.back.domain.store.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class AssetResDto {
    private Long assetId;
    private String assetImagePath;
    private AssetLevelType assetLevel;
    private String assetCategory;

    public static AssetResDto fromEntity(AssetEntity asset){
        return AssetResDto.builder()
                .assetId(asset.getId())
                .assetImagePath(asset.getAssetImagePath())
                .assetLevel(asset.getAssetLevel())
                .assetCategory(asset.getCategory())
                .build();
    }

}
