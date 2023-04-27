package com.server.back.domain.storage.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.repository.AssetPriceRepository;
import com.server.back.domain.store.repository.UserAssetRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserAssetRepository userAssetRepository;
    private final DealRepository dealRepository;
    private final AssetPriceRepository assetPriceRepository;

    /**
     * 본인 inventory 리스트 반환
     *
     * @return
     */
    @Override
    public List<MyAssetResDto> getStorageList() {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<UserAssetEntity> userAssetEntityList=userAssetRepository.findByUserAndIsInRepositoryAndIsDeleted(user, IsInRespository.Y, IsDeleted.N);
        return MyAssetResDto.fromEntityList(userAssetEntityList);
    }

    /**
     * inventory에서 되팔기
     *
     * @param myAssetId
     */
    @Transactional
    @Override
    public void createResale(Long myAssetId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        //본인 거 아니면 오류 반환
        UserAssetEntity userAsset=userAssetRepository.findById(myAssetId).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        if(!userAsset.getUser().equals(user))throw new CustomException(ErrorCode.NO_ACCESS);

        //삭제
        userAsset.update();

        //돈 얼마인지
        Long price=assetPriceRepository.findByAssetLevel(userAsset.getAsset().getAssetLevel()).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getPrice();
        Long resalePrice= Math.round(price * 0.7);

        //유저에게 돈 넣어주기
        DealEntity resale=new DealEntity(user,DealType.GET_MONEY_FOR_RESALE,resalePrice);
        //거래 내역 입력
        dealRepository.save(resale);
        //현재 돈에서 더하기
        user.increaseCurrentMoney(resalePrice);
    }
}
