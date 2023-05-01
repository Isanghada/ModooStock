package com.server.back.domain.admin.service;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.admin.dto.AdminAssetModifyReqDto;
import com.server.back.domain.admin.dto.AdminAssetResDto;

import java.util.List;

public interface AdminAssetService {
    List<AdminAssetResDto> getAssetList(AssetLevelType assetLevel, String category);

    void updateAsset(AdminAssetModifyReqDto reqDto);
}
