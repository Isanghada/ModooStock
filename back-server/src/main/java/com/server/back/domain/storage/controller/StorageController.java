package com.server.back.domain.storage.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.storage.service.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage")
@RequiredArgsConstructor
@Api(tags = "창고 API")
public class StorageController {

    private final StorageService storageService;

    @GetMapping
    @ApiOperation(value = "창고에 있는 물품 리스트 반환")
    public ResponseEntity<ResultDto<List<MyAssetResDto>>> getStorageList(){
        List<MyAssetResDto> storageResDto= storageService.getStorageList();
        return ResponseEntity.ok(ResultDto.of(storageResDto));

    }

    @PostMapping("/resale/{myAssetId}")
    @ApiOperation(value = "창고에 있는 물품 되팔기")
    public ResponseEntity<ResultDto<Boolean>> createResale(@PathVariable Long myAssetId){
        storageService.createResale(myAssetId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @GetMapping("/auction/{myAssetId}")
    @ApiOperation(value = "해당 물품 경매 시세 반환")
    public ResponseEntity<ResultDto<List<Long>>> getQuote(@PathVariable Long myAssetId){
        List<Long> quoteList=storageService.getQuote(myAssetId);
        return ResponseEntity.ok(ResultDto.of(quoteList));
    }

}
