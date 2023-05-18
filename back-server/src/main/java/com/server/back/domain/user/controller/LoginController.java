package com.server.back.domain.user.controller;


import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.user.dto.LoginReqDto;
import com.server.back.domain.user.dto.LoginResDto;
import com.server.back.domain.user.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "유저 로그인 API")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인합니다.", notes = "")
    public ResponseEntity<ResultDto<LoginResDto>> login(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
        LoginResDto loginResDto = loginService.login(loginReqDto, response);

        return ResponseEntity.ok().body(ResultDto.of(loginResDto));
    }


    @PostMapping("/refresh")
    @ApiOperation(value = "엑세스 토큰을 재발급합니다.", notes = "")
    public ResponseEntity<ResultDto<LoginResDto>> createAccessToken(@RequestHeader Map<String, String> loginRequestHeader, HttpServletResponse response) {
        LoginResDto loginResDto = loginService.createAccessToken(loginRequestHeader, response);

        return ResponseEntity.ok().body(ResultDto.of(loginResDto));
    }


    @GetMapping("/logout/redirect")
    @ApiOperation(value = "로그아웃합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> logoutPost(@RequestHeader Map<String, String> logoutRequestHeader) {
        loginService.deleteAccessToken(logoutRequestHeader);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

}