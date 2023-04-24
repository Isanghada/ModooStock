package com.server.back.domain.rank.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.rank.dto.RankListResDto;
import com.server.back.domain.rank.service.RankService;
import io.swagger.annotations.Api;
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

    private RankService rankService;

    @GetMapping
    public ResponseEntity<ResultDto<List<RankListResDto>>> getRanking(){
        List<RankListResDto>ranking=rankService.getRanking();
        return ResponseEntity.ok(ResultDto.of(ranking));
    }
}
