package com.server.back.domain.admin.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 관리자 에셋 정보 수정
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAssetModifyReqDto {
    private Long assetId;
    private String category;
    private AssetLevelType assetLevel;

    public AssetEntity toEntity(AssetEntity asset) {
        return AssetEntity.builder()
                .id(asset.getId())
                .assetImagePath(asset.getAssetImagePath())
                .assetLevel(this.assetLevel)
                .category((this.category))
                .build();
    }
}
