package com.server.back.domain.admin.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.admin.dto.AdminDealResDto;
import com.server.back.domain.admin.dto.AdminUserResDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/deal")
@RequiredArgsConstructor
@Api(tags="관리자 거래내역 API")
public class AdminDealController {
    @GetMapping
    @ApiOperation(value = "모든 거래 내역을 조회합니다", notes = "")
    public ResponseEntity<ResultDto<List<AdminDealResDto>>> getDealList(){
        List<AdminDealResDto> dealList= null;
        return ResponseEntity.ok(ResultDto.of(dealList));
    }
    @GetMapping("/{account}")
    @ApiOperation(value = "검색한 회원의 모든 거래 내역을 조회합니다", notes = "")
    public ResponseEntity<ResultDto<List<AdminDealResDto>>> getUserDealList(@PathVariable(name = "account")String account){
        List<AdminDealResDto> dealList= null;
        return ResponseEntity.ok(ResultDto.of(dealList));
    }
}
