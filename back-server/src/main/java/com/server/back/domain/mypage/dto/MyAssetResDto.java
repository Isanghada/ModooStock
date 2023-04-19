package com.server.back.domain.mypage.dto;

import com.server.back.common.code.commonCode.AssetLevelType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyAssetResDto {
    private Long userAssetId;
    private String assetImagePath;
    private AssetLevelType assetLevel;
    private String assetCategory;

}
