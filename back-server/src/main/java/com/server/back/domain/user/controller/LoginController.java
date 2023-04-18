package com.server.back.domain.user.controller;


import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.user.dto.LoginReqDto;
import com.server.back.domain.user.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@Api(tags = "유저 로그인 API")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> login(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
        loginService.login(loginReqDto, response);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }


    @PostMapping("/refresh")
    @ApiOperation(value = "엑세스 토큰을 재발급합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> createAccessToken(@RequestHeader Map<String, String> loginRequestHeader, HttpServletResponse response) {
        loginService.createAccessToken(loginRequestHeader, response);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }


    @GetMapping("/logout/redirect")
    @ApiOperation(value = "로그아웃합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> logoutPost(@RequestHeader Map<String, String> logoutRequestHeader) {
        loginService.deleteAccessToken(logoutRequestHeader);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

}