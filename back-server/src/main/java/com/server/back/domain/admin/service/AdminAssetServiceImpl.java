package com.server.back.domain.admin.service;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.admin.dto.AdminAssetModifyReqDto;
import com.server.back.domain.admin.dto.AdminAssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import com.server.back.domain.store.repository.AssetRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAssetServiceImpl implements AdminAssetService{
    private final AssetRepository assetRepository;
    /**
     * 검색한 에셋 정보를 반환합니다.
     *
     * @return       검색된 에셋들
     */
    @Override
    public List<AdminAssetResDto> getAssetList(AssetLevelType assetLevel, String category) {
        List<AssetEntity> assetEntityList;
        if(!assetLevel.equals(null) && !category.equals(null)){
            assetEntityList = assetRepository.findByAssetLevelAndCategory(assetLevel, category);
        }else if(!assetLevel.equals(null)){
            assetEntityList = assetRepository.findByAssetLevel(assetLevel);
        }
        else if(!assetLevel.equals(null)){
            assetEntityList = assetRepository.findByCategory(category);
        }
        else assetEntityList = assetRepository.findAll();
        return AdminAssetResDto.fromEntityList(assetEntityList);
    }
    /**
     * 에셋 정보를 수정합니다.
     *
     */
    @Override
    public void updateAsset(AdminAssetModifyReqDto reqDto) {
        AssetEntity asset = assetRepository.findById(reqDto.getAssetId()).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        AssetEntity assetEntity = reqDto.toEntity(asset);
        assetRepository.save(assetEntity);
    }
}