package com.server.back.domain.store.service;

import com.server.back.common.code.commonCode.*;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.entity.AssetEntity;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.store.repository.AssetRepository;
import com.server.back.domain.store.repository.UserAssetLocationRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

import static com.server.back.domain.store.dto.AssetResDto.fromEntity;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {


    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final UserAssetLocationRepository userAssetLocationRepository;
    private final DealRepository dealRepository;
    private final AuthService authService;

    /**
     * 갓챠를 뽑습니다.
     *
     * @param gotchaLevel
     * @return
     */
    @Override
    @Transactional
    public AssetResDto createGotcha(String gotchaLevel) {
        Long userId= authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        GotchaLevel level=GotchaLevel.valueOf(gotchaLevel);

        Long price=0L;

        AssetEntity asset;

        //gotcha 레벨에 따라 비율이 달라짐
        if(level.equals(GotchaLevel.HIGH)) {
            price=3000000L;
            if(user.getCurrentMoney()<price)throw new CustomException(ErrorCode.LACK_OF_MONEY);
            Random random=new Random();
            int rd=random.nextInt(100);
            if(rd<1){
              asset=assetRepository.findByAssetLevelAndLimit("LEGENDARY");
            } else if(rd>=1&&rd<15){
                asset=assetRepository.findByAssetLevelAndLimit("UNIQUE");
            }else if(rd>=15&&rd<60){
                asset=assetRepository.findByAssetLevelAndLimit("EPIC");
            }else {
                asset=assetRepository.findByAssetLevelAndLimit("RARE");
            }
        }else if(level.equals(GotchaLevel.MIDDLE)) {
            price=1000000L;
            if(user.getCurrentMoney()<price)throw new CustomException(ErrorCode.LACK_OF_MONEY);
            Random random=new Random();
            int rd=random.nextInt(100);
            if(rd<3){
                asset=assetRepository.findByAssetLevelAndLimit("UNIQUE");
            }else if(rd>=3&&rd<35){
                asset=assetRepository.findByAssetLevelAndLimit("EPIC");
            }else {
                asset=assetRepository.findByAssetLevelAndLimit("RARE");
            }
        }else{
            price=500000L;
            if(user.getCurrentMoney()<price)throw new CustomException(ErrorCode.LACK_OF_MONEY);

            Random random=new Random();
            int rd=random.nextInt(100);
            if(rd<1){
                asset=assetRepository.findByAssetLevelAndLimit("UNIQUE");
            }else if(rd>=1&&rd<17){
                asset=assetRepository.findByAssetLevelAndLimit("EPIC");
            }else {
                asset = assetRepository.findByAssetLevelAndLimit("RARE");
            }
        }

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

        // 거래 내역에 추가
        DealEntity deal=new DealEntity(user,DealType.LOSE_MONEY_FOR_ASSET,price);
        dealRepository.save(deal);

        log.info(String.valueOf(price));
        user.decreaseCurrentMoney(price);
        log.info(String.valueOf(user.getCurrentMoney()));

        // asset 반환
        return fromEntity(asset);
    }
}
