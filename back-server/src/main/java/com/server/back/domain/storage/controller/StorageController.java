package com.server.back.domain.storage.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.storage.service.StorageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/storage")
@RequiredArgsConstructor
@Api(tags = "창고 API")
public class StorageController {

    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<ResultDto<List<MyAssetResDto>>> getStorageList(){
        List<MyAssetResDto> storageResDto= storageService.getStorageList();
        return ResponseEntity.ok(ResultDto.of(storageResDto));

    }
}
