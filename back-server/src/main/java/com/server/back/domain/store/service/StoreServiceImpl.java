package com.server.back.domain.store.service;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import com.server.back.domain.store.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.server.back.domain.store.dto.AssetResDto.fromEntity;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final AssetRepository assetRepository;

    @Override
    public AssetResDto createGotcha(AssetLevelType level) {

        List<AssetEntity> assetEntityList=assetRepository.findAllByAssetLevel(level);
        return fromEntity(assetEntityList.get(0));
    }
}
