package com.server.back.domain.admin.controller;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.admin.dto.AdminAssetModifyReqDto;
import com.server.back.domain.admin.dto.AdminAssetResDto;
import com.server.back.domain.admin.service.AdminAssetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/asset")
@RequiredArgsConstructor
@Api(tags="관리자 에셋 API")
public class AdminAssetController {
    private final AdminAssetService adminAssetService;
    @GetMapping
    @ApiOperation(value = "검색한 에셋 정보를 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminAssetResDto>>> getAssetList(@RequestParam(required = false, name = "assetLevel")AssetLevelType assetLevel, @RequestParam(required = false, name = "category")String category){
        List<AdminAssetResDto> assetList= adminAssetService.getAssetList(assetLevel, category);
        return ResponseEntity.ok(ResultDto.of(assetList));
    }
    @PutMapping
    @ApiOperation(value = "에셋 정보를 수정합니다", notes = "")
    public ResponseEntity<ResultDto<Boolean>> updateAsset(@RequestBody AdminAssetModifyReqDto reqDto){
        adminAssetService.updateAsset(reqDto);
        return ResponseEntity.ok(ResultDto.ofSuccess());
    }
}
