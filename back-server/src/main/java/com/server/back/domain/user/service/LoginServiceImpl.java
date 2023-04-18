package com.server.back.domain.user.service;

import com.server.back.domain.user.dto.LoginReqDto;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService{

    /**
     *
     * @param loginReqDto 계정과 비밀번호 (account, password)
     * @param response    엑세스 토큰을 담을 response
     */
    @Override
    public void login(LoginReqDto loginReqDto, HttpServletResponse response) {
    }


    /**
     * 엑세스 토큰을 재발급합니다
     *
     * @param loginRequestHeader 엑세스 토큰
     * @param response           엑세스 토큰을 담을 response
     */
    @Override
    public void createAccessToken(Map<String, String> loginRequestHeader, HttpServletResponse response) {
    }

    /**
     * 로그아웃합니다 (엑세스 토큰 삭제)
     *
     * @param logoutRequestHeader  엑세스 토큰
     */
    @Override
    public void deleteAccessToken(Map<String, String> logoutRequestHeader) {
    }
}
