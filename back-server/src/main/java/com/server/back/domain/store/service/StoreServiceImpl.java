package com.server.back.domain.store.service;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.commonCode.GotchaLevel;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import com.server.back.domain.store.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.server.back.domain.store.dto.AssetResDto.fromEntity;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final AssetRepository assetRepository;

    @Override
    public AssetResDto createGotcha(String gotchaStr) {
        GotchaLevel level=GotchaLevel.of(gotchaStr);

        List<AssetEntity>list=new ArrayList<>();

        if(level.equals(GotchaLevel.HIGH)) {
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.UNIQUE), 10));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.EPIC), 40));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.RARE), 50));
        }else if(level.equals(GotchaLevel.MIDDLE)) {
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.UNIQUE), 3));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.EPIC), 27));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.RARE), 70));
        }else {
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.UNIQUE), 1));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.EPIC), 14));
            list.addAll( assetRepository.findAllByAssetLevel(String.valueOf(AssetLevelType.RARE), 85));
        }

        Random random=new Random();
        int randomIdx= random.nextInt(list.size());

        return fromEntity(list.get(randomIdx));
    }
}
