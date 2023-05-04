package com.server.back.domain.storage.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.auction.repository.AuctionRepository;
import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.storage.dto.AuctionHistoryResDto;
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
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserAssetRepository userAssetRepository;
    private final DealRepository dealRepository;
    private final AssetPriceRepository assetPriceRepository;
    private final AuctionRepository auctionRepository;

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

    /**
     * 지금 판매 시세 알려주기
     *
     * @param myAssetId
     * @return
     */
    @Override
    public List<Long> getQuote(Long myAssetId) {
        //현재 유저
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetEntity userAsset=userAssetRepository.findByIdAndIsDeleted(myAssetId,IsDeleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        if(!userAsset.getUser().equals(user)) throw new CustomException(ErrorCode.NO_ACCESS);

        //해당 에셋
        Long AssetId =userAsset.getAsset().getId();

        //경매 완료가 아닌 현재 진행 중인 경매
        List<AuctionEntity> auctionEntityList=auctionRepository.findAllByUserAssetAssetIdAndIsCompletedAndIsDeletedOrderByCreatedAtDesc(AssetId, IsCompleted.N,IsDeleted.N);

        return auctionEntityList.stream().map(AuctionEntity::getAuctionPrice).collect(Collectors.toList());
    }

    /**
     * 해당 물품 과거 경매 이력 반환
     *
     * @param myAssetId
     * @return
     */
    @Override
    public List<AuctionHistoryResDto> getAuctionHistory(Long myAssetId) {
        //현재 유저
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetEntity userAsset=userAssetRepository.findByIdAndIsDeleted(myAssetId,IsDeleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        if(!userAsset.getUser().equals(user)) throw new CustomException(ErrorCode.NO_ACCESS);

        //해당 에셋
        Long AssetId =userAsset.getAsset().getId();

        log.info(String.valueOf(AssetId));

        //경매 완료된 리스트
        List<AuctionEntity> auctionEntityList=auctionRepository.findAllByUserAssetAssetIdAndIsCompletedAndIsDeletedOrderByCreatedAtDesc(AssetId, IsCompleted.Y,IsDeleted.N);

        return AuctionHistoryResDto.fromEntityList(auctionEntityList);
    }

}
