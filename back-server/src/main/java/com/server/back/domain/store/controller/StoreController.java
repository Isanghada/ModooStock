package com.server.back.domain.store.controller;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.store.dto.AssetResDto;
import com.server.back.domain.store.service.StoreService;
import io.swagger.annotations.Api;
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

    @PostMapping("/level/{assetLevel}")
    public ResponseEntity<ResultDto<AssetResDto>> gotchaAsset(@PathVariable String assetLevel){

        AssetResDto respnoseDto=service.createGotcha(assetLevel);
        return ResponseEntity.status(HttpStatus.OK).body(ResultDto.of(respnoseDto));
    }
}
