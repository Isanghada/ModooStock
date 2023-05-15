package com.server.back.domain.mypage.service;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.auction.repository.AuctionRepository;
import com.server.back.domain.auction.service.AuctionService;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    private final UserAssetLocationRepository userAssetLocationRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final AuthService authService;
    private final RedisTemplate<String,Object> redisTemplate;

    private final AuctionService auctionService;


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

        // 카테고리 ROOM 제외 나머지 asset들 모두 posZ를 -200로 설정
        if (!userAssetLocation.getAsset().getCategory().equals("ROOM")) userAssetLocation.update(-200F);
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

    /**
     * IP,닉네임에 맞게 방문자 수 반환 (쿠키 & redis 사용)
     *
     * @param nickname
     * @param request
     * @param response
     * @return
     */
    @Override
    public Long getVisitorCount(String nickname,HttpServletRequest request, HttpServletResponse response){
        UserEntity user = userRepository.findByNicknameAndIsDeleted(nickname, IsDeleted.N)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Long userId = user.getId();
        String ipAddress = getClientIpAddress(request);
        String cookieName = "visitor_id_" + ipAddress.replaceAll(":", "_") + "_to_" + userId;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    // 이미 쿠키가 발급되어 있음
                    return redisTemplate.opsForValue().increment(cookieName);
                }
            }
        }

        Cookie visitorCookie = new Cookie(cookieName, UUID.randomUUID().toString());
        visitorCookie.setMaxAge(90 * 24 * 60 * 60); // 쿠키 만료 시간: 90일
        response.addCookie(visitorCookie);

        redisTemplate.opsForValue().set(cookieName, 1L);
        return 1L;
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }
}
