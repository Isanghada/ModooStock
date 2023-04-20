package com.server.back.domain.auction.service;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.service.AuthService;
import com.server.back.domain.auction.dto.AuctionReqDto;
import com.server.back.domain.auction.dto.AuctionResDto;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.auction.repository.AuctionRepository;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.store.repository.UserAssetLocationRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final AuthService authService;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final UserAssetLocationRepository userAssetLocationRepository;

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
        UserAssetEntity userAsset=auction.getUserAsset();
        UserAssetLocation userAssetLocation=userAssetLocationRepository.findById(userAsset.getId()).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        //좌표 0으로 초기화
        userAssetLocation.init();
        //보유 유저 바꾸기 & 경매 유무 변경
        userAsset.update(user);
        auction.update(IsCompleted.Y);

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

        UserAssetEntity userAsset=auctionRepository.findByIdAndIsDeletedAndIsCompleted(auctionId,IsDeleted.N,IsCompleted.N).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getUserAsset();
        //보유한 유저가 아니면
        if(!userAsset.getUser().equals(user)){
            throw new CustomException(ErrorCode.NO_ACCESS);
        }
        //경매유무 변경
        userAsset.update(IsAuctioned.N);
    }

    /**
     * 경매에 물품 등록
     *
     * @param auctionReqDto
     */
    @Override
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
}
