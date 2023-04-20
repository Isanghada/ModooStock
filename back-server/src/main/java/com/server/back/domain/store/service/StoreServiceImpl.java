package com.server.back.domain.store.service;

import com.server.back.common.code.commonCode.*;
import com.server.back.common.service.AuthService;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.store.repository.AssetRepository;
import com.server.back.domain.store.repository.UserAssetLocationRepository;
import com.server.back.domain.store.repository.UserAssetRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.server.back.domain.store.dto.AssetResDto.fromEntity;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {


    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final UserAssetLocationRepository userAssetLocationRepository;
    private final AuthService authService;

    /**
     * 갓챠를 뽑습니다.
     *
     * @param gotchaLevel
     * @return
     */
    @Override
    public AssetResDto createGotcha(String gotchaLevel) {
        Long userId= authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        GotchaLevel level=GotchaLevel.valueOf(gotchaLevel);
        log.info("createGotcha");

        List<AssetEntity>list=new ArrayList<>();
        log.info(String.valueOf(level));
        //gotcha 레벨에 따라 비율이 달라짐
        if(level.equals(GotchaLevel.HIGH)) {
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("UNIQUE", 10));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("EPIC", 40));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("RARE", 50));
        }else if(level.equals(GotchaLevel.MIDDLE)) {
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("UNIQUE", 3));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("EPIC", 27));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("RARE", 70));
        }else if(level.equals(GotchaLevel.LOW)){
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("UNIQUE", 1));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("EPIC", 14));
            list.addAll( assetRepository.findAllByAssetLevelAndLimit("RARE", 85));
        }

        //랜덤으로 하나 고름
        Random random=new Random();
        int randomIdx= random.nextInt(list.size());

        //asset
        AssetEntity asset=list.get(randomIdx);

        //userAsset에 user와 asset 조합해서 삽임
        UserAssetLocation userAssetLocation=UserAssetLocation.builder()
                .asset(asset)
                .user(user)
                .isDeleted(IsDeleted.N)
                .isInRepository(IsInRespository.Y)
                .isAuctioned(IsAuctioned.N)
                .build();
        userAssetLocation.init();


        userAssetLocationRepository.save(userAssetLocation);

        // asset 반환
        return fromEntity(asset);
    }
}
