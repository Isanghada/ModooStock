package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.LoginReqDto;
import com.server.back.domain.user.dto.LoginResDto;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface LoginService {
    LoginResDto login(LoginReqDto loginReqDto, HttpServletResponse response);

    LoginResDto createAccessToken(Map<String, String> loginRequestHeader, HttpServletResponse response);

    void deleteAccessToken(Map<String, String> logoutRequestHeader);
}
