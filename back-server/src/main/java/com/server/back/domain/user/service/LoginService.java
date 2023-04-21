package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.LoginReqDto;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface LoginService {
    void login(LoginReqDto loginReqDto, HttpServletResponse response);

    void createAccessToken(Map<String, String> loginRequestHeader, HttpServletResponse response);

    void deleteAccessToken(Map<String, String> logoutRequestHeader);
}
