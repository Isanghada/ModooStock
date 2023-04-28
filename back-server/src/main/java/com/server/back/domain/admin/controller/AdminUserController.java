package com.server.back.domain.admin.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.admin.dto.AdminUserResDto;
import com.server.back.domain.rank.dto.RankResDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/user")
@RequiredArgsConstructor
@Api(tags="관리자 유저 API")
public class AdminUserController {
    @GetMapping
    @ApiOperation(value = "전체 회원 목록을 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminUserResDto>>> getBasicUserList(){
        List<AdminUserResDto> userList= null;
        return ResponseEntity.ok(ResultDto.of(userList));
    }

}
