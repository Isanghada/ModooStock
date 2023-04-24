package com.server.back.domain.mypage.service;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.mypage.dto.HomeModifyReqDto;
import com.server.back.domain.mypage.dto.HomeResDto;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.store.repository.UserAssetLocationRepository;
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
public class MyPageServiceImpl implements MyPageService{

    private final UserAssetLocationRepository userAssetLocationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;


    /**
     * 홈피 내에서 배치 수정
     *
     * @param request
     */
    @Transactional
    @Override
    public void updateUserAssetInMyPage(HomeModifyReqDto request) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetLocation userAssetLocation=userAssetLocationRepository.findByIdAndIsDeletedAndIsInRepositoryAndIsAuctioned(request.getUserAssetId(), IsDeleted.N, IsInRespository.N, IsAuctioned.N)
                .orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        // 본인 아니면 접근 제한
        if(!user.equals(userAssetLocation.getUser()))throw new CustomException(ErrorCode.NO_ACCESS);

        //좌표 변환
        userAssetLocation.update(request.getPos_x(), request.getPos_y(), request.getPos_z(), request.getRot_x(), request.getRot_y(), request.getRot_z());
    }

    /**
     * 인벤토리의 에셋 홈피에 넣기
     *
     * @param myAssetId
     */
    @Transactional
    @Override
    public void createUserAssetInMyPage(Long myAssetId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetLocation userAssetLocation=userAssetLocationRepository.findByIdAndIsDeletedAndIsInRepositoryAndIsAuctioned(myAssetId, IsDeleted.N, IsInRespository.Y, IsAuctioned.N)
                .orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        // 본인 아니면 접근 제한
        if(!user.equals(userAssetLocation.getUser()))throw new CustomException(ErrorCode.NO_ACCESS);

        userAssetLocation.update(IsInRespository.N);
    }

    /**
     * 에셋 홈피에서 빼서 inventory에 넣기
     *
     * @param myAssetId
     */
    @Transactional
    @Override
    public void deleteUserAssetInMyPage(Long myAssetId) {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        UserAssetLocation userAssetLocation=userAssetLocationRepository.findByIdAndIsDeletedAndIsInRepositoryAndIsAuctioned(myAssetId, IsDeleted.N, IsInRespository.N, IsAuctioned.N)
                .orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        // 본인 아니면 접근 제한
        if(!user.equals(userAssetLocation.getUser()))throw new CustomException(ErrorCode.NO_ACCESS);

        //위치 초기화
        userAssetLocation.init();
        userAssetLocation.update(IsInRespository.Y);
    }

    /**
     * 마이홈페이지에 있는 유저 방 반환
     *
     * @param nickname
     * @return
     */
    @Override
    public List<HomeResDto> geMyPageMyRoom(String nickname) {
        UserEntity user=userRepository.findByNickname(nickname).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        List<UserAssetLocation> userAssetLocationList=userAssetLocationRepository.findAllByUserAndIsDeletedAndIsAuctionedAndIsInRepository(user,IsDeleted.N,IsAuctioned.N,IsInRespository.N);

        return HomeResDto.fromEntityList(userAssetLocationList);
    }
}
