package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.*;
import com.server.back.domain.user.entity.UserEntity;

import java.util.List;

public interface UserService {

    UserEntity getUserById(Long id);
    UserEntity getUserByNickname(String nickname);

    void createUser(UsersRegisterReqDto usersRegisterReqDto);

    UserInfoLoginResDto getLoginUser();

    Boolean checkAccount(String account);

    Boolean checkNickname(String nickname);

    void updateUser(UsersModifyReqDto usersModifyReqDto);

    void deleteUser();

    List<UserResDto> getUserList(String search);

    UserResDto getUserRandom();

    UserInfoResDto getUser(String nickname, UserInfoReqDto userInfoReqDto);
}
