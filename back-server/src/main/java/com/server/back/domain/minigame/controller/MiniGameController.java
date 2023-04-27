package com.server.back.domain.minigame.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.minigame.dto.MiniGameResDto;
import com.server.back.domain.minigame.service.MiniGameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mini")
@RequiredArgsConstructor
@Api(tags = "미니게임 API")
public class MiniGameController {

    private final MiniGameService miniGameService;

    @PostMapping("/bright")
    @ApiOperation(value = "스피드 로또에 참여합니다.")
    public ResponseEntity<ResultDto<MiniGameResDto>> createBrightLotto(){
        MiniGameResDto miniGameResDto=miniGameService.createBrightLotto();
        return ResponseEntity.ok(ResultDto.of(miniGameResDto));
    }

    @PostMapping("/dark")
    @ApiOperation(value = "어둠의 복권에 참여합니다.")
    public ResponseEntity<ResultDto<MiniGameResDto>> createDarkLotto(){
        MiniGameResDto miniGameResDto=miniGameService.createDarkLotto();
        return ResponseEntity.ok(ResultDto.of(miniGameResDto));
    }
}
