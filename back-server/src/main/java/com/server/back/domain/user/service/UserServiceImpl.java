package com.server.back.domain.user.service;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.service.AuthService;
import com.server.back.domain.user.dto.*;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;

import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    @Override
    public UserEntity getUserById(Long id) {
        return userRepository.findByIdAndIsDeleted(id, IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    public UserEntity getUserByNickname(String nickname) {
        return userRepository.findByNicknameAndIsDeleted(nickname, IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    /**
     * 회원을 생성합니다.
     * 
     * @param usersRegisterReqDto 생성할 회원정보
     */
    @Override
    @Transactional
    public void createUser(UsersRegisterReqDto usersRegisterReqDto) {
        // 이미 존재하는 계정인지 다시 한번 확인
        if (userRepository.findByAccount(usersRegisterReqDto.getAccount()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        // 이미 존재하는 닉네임인지 다시 한번 확인
        if (userRepository.findByNickname(usersRegisterReqDto.getNickname()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        // 비밀번호 암호화
        usersRegisterReqDto.setPassword(passwordEncoder.encode(usersRegisterReqDto.getPassword()));
        userRepository.save(usersRegisterReqDto.toEntity());
    }

    /**
     * 로그인한 유저정보를 반환합니다.
     *
     * @return 로그인한 유저 정보
     */
    @Override
    public UserInfoLoginResDto getLoginUser() {
        Long userId = authService.getUserId();
        UserEntity user = getUserById(userId);

        // TODO 수익률 계산
        // 주식 넣었던 종목별 수익률 평균
        Float totalStockReturn = 0.0f;
        return UserInfoLoginResDto.fromEntity(user, totalStockReturn);
    }

    /**
     * 계정 중복을 확인합니다
     *
     * @param account 유저 계정
     * @return TRUE: 계정 중복 아님, FALSE: 계정 중복
     */
    @Override
    public Boolean checkAccount(String account) {
        return userRepository.findByAccount(account).isEmpty();
    }

    /**
     * 닉네임 중복을 확인합니다
     *
     * @param nickname 유저 닉네임
     * @return TRUE: 닉네임 중복 아님, FALSE: 닉네임 중복
     */
    @Override
    public Boolean checkNickname(String nickname) {
        return userRepository.findByNickname(nickname).isEmpty();
    }

    /**
     * 회원 정보를 수정합니다.
     * 
     * @param usersModifyReqDto 수정할 회원정보
     */
    @Transactional
    @Override
    public void updateUser(UsersModifyReqDto usersModifyReqDto) {
        Long userId = authService.getUserId();
        UserEntity user = getUserById(userId);

        usersModifyReqDto.setPassword(passwordEncoder.encode(usersModifyReqDto.getPassword()));
        userRepository.save(usersModifyReqDto.toEntity(user));
        log.info("getUserById(userId): {}", getUserById(userId));
    }

    /**
     * 회원을 탈퇴합니다. (삭제)
     */
    @Transactional
    @Override
    public void deleteUser() {
        /* TODO
        - table 삭제: 거래, 은행, 주식거래, 보유주식, 보유 뉴스
        - isDeleted.Y: 회원에셋, 회원
         */
        Long userId = authService.getUserId();
        UserEntity user = getUserById(userId);
        user.setIsDeleted(IsDeleted.Y);

        userRepository.save(user);

    }

    /**
     * 회원을 검색합니다.
     * 
     * @param search 계정 또는 닉네임
     * @return       검색된 회원들
     */

    @Override
    public List<UserResDto> getUserList(String search) {
        List<UserEntity> userList= userRepository.findByAccountContainingOrNicknameContaining(search, search);
        return UserResDto.fromEnityList(userList);
    }

    /**
     * 랜덤한 회원 1명을 반환합니다. (본인 제외)
     *
     * @return 랜덤 회원 반환
     */
    @Override
    public UserResDto getUserRandom() {
        Long userId = authService.getUserId(); // 로그인한 유저인 본인 제외
        UserEntity user = userRepository.findRandomUserExcluding(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return UserResDto.fromEntity(user);
    }

    /**
     * 회원에 대한 정보 (회원 홈피 방문시)
     *
     * @param nickname 방문한 회원의 닉네임
     * @return         방문한 회원에 대한 정보  (닉네임, 프로필 이미지, 한즐소개, 총자산)
     */
    @Override
    public UserInfoResDto getUser(String nickname) {
        UserEntity user = getUserByNickname(nickname);
        
        // TODO 총 자산 계산 후 가져오기
        // 계산 방법:
        // 은행 이자 붙이기전 금액 싹다
        // + 현 지갑에 있는 돈
        // + 주식에 넣은 돈 (종가 * 개수)
        // + 내 에셋 별 돈 계산
        Integer totalCash = user.getCurrentMoney();
        return UserInfoResDto.fromEntity(user, totalCash);
    }
}
