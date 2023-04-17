package com.server.back.common.code.controller;

import com.server.back.common.code.commonCode.TypeGroup;
import com.server.back.common.code.commonCode.TypeModel;
import com.server.back.common.code.dto.ResultDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Api(tags = "공통 코드 API")
public class CommonCodeController {
    @GetMapping("/type")
    @ApiOperation(value = "공통 코드 전체 목록을 조회합니다.")
    public ResponseEntity<ResultDto<Map<String, Map<String, String>>>> getCommonCode() {
        Map<String, Map<String, String>> totalTypeMap = new HashMap<>(); // <공통 그룹 코드, 공통 코드들> 로 묶음

        for (TypeGroup typeGroup : TypeGroup.values()) {
            Map<String, String> typeMap = typeGroup.getTypeList().stream() // group에 속한 공통 코드들을 list<enum>에서 map<코드, 설명>으로 변환
                    .collect(Collectors.toMap(
                            TypeModel::getName,
                            TypeModel::getDescription));

            totalTypeMap.put(typeGroup.name(), typeMap);
        }
        return ResponseEntity.ok(ResultDto.of(totalTypeMap));
    }
}
