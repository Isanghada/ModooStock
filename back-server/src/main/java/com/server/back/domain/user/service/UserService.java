package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.UserInfoResDto;
import com.server.back.domain.user.dto.UserResDto;
import com.server.back.domain.user.dto.UsersModifyReqDto;
import com.server.back.domain.user.dto.UsersRegisterReqDto;

import java.util.List;

public interface UserService {
    void createUser(UsersRegisterReqDto usersRegisterReqDto);

    UserInfoResDto getUser();

    Boolean checkAccount(String account);

    Boolean checkNickname(String nickname);

    void updateUser(UsersModifyReqDto usersModifyReqDto);

    void deleteUser();

    List<UserResDto> getUserList(String search);

    UserResDto getUserRandom();
}
