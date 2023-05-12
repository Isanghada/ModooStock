package com.server.back.domain.auction.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.auction.dto.AuctionReqDto;
import com.server.back.domain.auction.dto.AuctionResDto;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.auction.repository.AuctionRepository;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.store.repository.UserAssetLocationRepository;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final AuthService authService;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final UserAssetRepository userAssetRepository;
    private final UserAssetLocationRepository userAssetLocationRepository;
    private final DealRepository dealRepository;

    /**
     * 경매 물품 리스트 조회
     *
     * @return
     */
    @Override
    public List<AuctionResDto> getAuctionList() {
        List<AuctionEntity> auctionEntityList=auctionRepository.findAllByIsDeletedAndIsCompletedOrderByCreatedAtDesc(IsDeleted.N,IsCompleted.N);
        return AuctionResDto.fromEntityList(auctionEntityList);
    }

    /**
     * 경매 물품 상세 조회
     *
     * @param auctionId
     * @return
     */
    @Override
    public AuctionResDto getAuctionDetail(Long auctionId) {
        AuctionEntity auctionEntity=auctionRepository.findByIdAndIsDeletedAndIsCompleted(auctionId,IsDeleted.N,IsCompleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return AuctionResDto.fromEntity(auctionEntity);
    }

    /**
     * 경매 참여
     *
     * @param auctionId
     * @return
     */
    @Override
    @Transactional
    public void participateAuction(Long auctionId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        AuctionEntity auction=auctionRepository.findByIdAndIsDeletedAndIsCompleted(auctionId,IsDeleted.N,IsCompleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        //잔액 부족
        if(auction.getAuctionPrice()>user.getCurrentMoney())throw new CustomException(ErrorCode.LACK_OF_MONEY);

        UserEntity saler=auction.getUserAsset().getUser();
        UserAssetEntity userAsset=auction.getUserAsset();
        UserAssetLocation userAssetLocation=userAssetLocationRepository.findById(userAsset.getId()).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        //좌표 0으로 초기화
        userAssetLocation.init();
        //보유 유저 바꾸기 & 경매 유무 변경
        userAsset.update(user);
        auction.update(IsCompleted.Y);

        //거래 내역
        DealEntity bidderDeal=new DealEntity(user,DealType.LOSE_MONEY_FOR_AUCTION,auction.getAuctionPrice());
        DealEntity salerDeal=new DealEntity(saler,DealType.GET_MONEY_FOR_AUCTION,auction.getAuctionPrice());

        //거래 내역 입력
        dealRepository.save(bidderDeal);
        dealRepository.save(salerDeal);

        //현재 돈에서 빼고 더하기
        user.decreaseCurrentMoney(auction.getAuctionPrice());
        saler.increaseCurrentMoney(auction.getAuctionPrice());

    }

    /**
     * 경매 취소
     *
     * @param auctionId
     * @return
     */
    @Override
    @Transactional
    public void deleteAuction(Long auctionId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        AuctionEntity auction=auctionRepository.findByIdAndIsDeletedAndIsCompleted(auctionId,IsDeleted.N,IsCompleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        UserAssetEntity userAsset=auction.getUserAsset();
        //보유한 유저가 아니면
        if(!userAsset.getUser().equals(user)){
            throw new CustomException(ErrorCode.NO_ACCESS);
        }
        //경매유무 변경
        userAsset.update(IsAuctioned.N);
        auction.update(IsDeleted.Y);
    }

    /**
     * 경매에 물품 등록
     *
     * @param auctionReqDto
     */
    @Override
    @Transactional
    public void createAuction(AuctionReqDto auctionReqDto) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetEntity userAsset=userAssetLocationRepository.findById(auctionReqDto.getUserAssetId()).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        if(!user.equals(userAsset.getUser()))throw new CustomException(ErrorCode.NO_ACCESS);

        //경매 유무
        userAsset.update(IsAuctioned.Y);
        //경매repository에 저장
        AuctionEntity auction= auctionReqDto.toEntity(userAsset);
        auctionRepository.save(auction);

    }

    /**
     * 내가 올린 경매 리스트 반환
     *
     * @return
     */
    @Override
    public List<AuctionResDto> getMyAuctionList() {
     Long userId= authService.getUserId();
     UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

     List<AuctionEntity> auctionEntityList=auctionRepository.findAllByUserAssetUserIdAndIsCompletedAndIsDeletedOrderByCreatedAtDesc(user.getId(),IsCompleted.N,IsDeleted.N);
     return AuctionResDto.fromEntityList(auctionEntityList);
    }

    /**
     * 마이페이지에서 경매 취소
     *
     * @param myAssetId
     * @return
     */
    @Override
    public void deleteMyPageAuction(Long myAssetId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        AuctionEntity auction = auctionRepository.findByUserAssetIdAndIsCompletedAndIsDeleted(myAssetId, IsCompleted.N, IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        UserAssetEntity userAsset=auction.getUserAsset();
        //보유한 유저가 아니면
        if(!userAsset.getUser().equals(user)){
            throw new CustomException(ErrorCode.NO_ACCESS);
        }
        //경매유무 변경
        userAsset.update(IsAuctioned.N);
        userAssetRepository.save(userAsset);

        auction.update(IsDeleted.Y);
        auctionRepository.save(auction);
    }
}
