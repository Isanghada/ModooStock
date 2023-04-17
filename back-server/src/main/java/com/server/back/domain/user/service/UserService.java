package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.UserInfoResDto;
import com.server.back.domain.user.dto.UsersModifyReqDto;
import com.server.back.domain.user.dto.UsersRegisterReqDto;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * 회원을 생성합니다.
     * 
     * @param usersRegisterReqDto 생성할 회원정보
     */
    public void createUser(UsersRegisterReqDto usersRegisterReqDto) {
    }

    /**
     * 로그인한 유저정보를 반환합니다.
     *
     * @return 로그인한 유저 정보
     */
    public UserInfoResDto getUser() {
        return UserInfoResDto.fromEntity(new UserEntity());
    }

    /**
     * 계정 중복을 확인합니다
     *
     * @param account 유저 계정
     * @return TRUE: 계정 중복 아님, FALSE: 계정 중복
     */
    public Boolean checkAccount(String account) {
        return true;
    }

    /**
     * 닉네임 중복을 확인합니다
     *
     * @param nickname 유저 닉네임
     * @return TRUE: 닉네임 중복 아님, FALSE: 닉네임 중복
     */
    public Boolean checkNickname(String nickname) {
        return true;
    }

    /**
     * 회원 정보를 수정합니다.
     * 
     * @param usersModifyReqDto 수정할 회원정보
     */
    public void updateUser(UsersModifyReqDto usersModifyReqDto) {
    }

    /**
     * 회원을 탈퇴합니다. (삭제)
     */
    public void deleteUser() {
    }

}
