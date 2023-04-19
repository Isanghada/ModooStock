package com.server.back.domain.store.controller;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.service.StoreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Api(tags="상점(가챠) API")
public class StoreController {
    private final StoreService service;


    @PostMapping("/level/{gotchaLevel}")
    @ApiOperation(value = "상점에서 갓챠를 통해 물품을 얻습니다.", notes = "")
    public ResponseEntity<ResultDto<AssetResDto>> gotchaAsset(@PathVariable String gotchaLevel){

        AssetResDto respnoseDto=service.createGotcha(gotchaLevel);
        return ResponseEntity.status(HttpStatus.OK).body(ResultDto.of(respnoseDto));
    }
}
