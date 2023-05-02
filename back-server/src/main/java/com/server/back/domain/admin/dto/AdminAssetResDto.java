package com.server.back.domain.admin.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class AdminAssetResDto {
    private Long assetId;
    private String assetImagePath;
    private AssetLevelType assetLevel;
    private String assetCategory;

    public static AdminAssetResDto fromEntity(AssetEntity asset){
        return AdminAssetResDto.builder()
                .assetId(asset.getId())
                .assetImagePath(asset.getAssetImagePath())
                .assetLevel(asset.getAssetLevel())
                .assetCategory(asset.getCategory())
                .build();
    }

    public static List<AdminAssetResDto> fromEntityList(List<AssetEntity> assetEntityList){
        return assetEntityList.stream().map(AdminAssetResDto::fromEntity).collect(Collectors.toList());
    }
}
