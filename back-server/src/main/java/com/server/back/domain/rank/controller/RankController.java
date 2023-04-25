package com.server.back.domain.rank.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.rank.dto.RankResDto;
import com.server.back.domain.rank.service.RankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rank")
@RequiredArgsConstructor
@Api(tags = "랭킹 API")
public class RankController {

    private final RankService rankService;

    @GetMapping
    @ApiOperation(value = "랭킹 리스트를 뽑아줍니다.", notes = "")
    public ResponseEntity<ResultDto<List<RankResDto>>> getRanking(){
        List<RankResDto>ranking=rankService.getRanking();
        return ResponseEntity.ok(ResultDto.of(ranking));
    }
}
