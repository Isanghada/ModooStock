package com.server.back.domain.admin.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.admin.dto.AdminDealResDto;
import com.server.back.domain.admin.dto.AdminMarketResDto;
import com.server.back.domain.admin.dto.AdminStockResDto;
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
@RequestMapping("/admin/market")
@RequiredArgsConstructor
@Api(tags="관리자 장(시즌) API")
public class AdminMarketController {
    @GetMapping
    @ApiOperation(value = "모든 장(시즌) 목록을 조회합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminMarketResDto>>> getMarketList(){
        List<AdminMarketResDto> marketList= null;
        return ResponseEntity.ok(ResultDto.of(marketList));
    }
    @GetMapping("/{marketId}")
    @ApiOperation(value = "모든 장(시즌) 목록을 조회합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminStockResDto>>> getMarketInfo(@PathVariable(name = "marketId")Long marketId){
        List<AdminStockResDto> marketInfoList= null;
        return ResponseEntity.ok(ResultDto.of(marketInfoList));
    }
}
