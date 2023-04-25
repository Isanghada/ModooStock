package com.server.back.domain.mypage.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.mypage.dto.HomeModifyReqDto;
import com.server.back.domain.mypage.dto.HomeResDto;
import com.server.back.domain.mypage.service.MyPageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Api(tags="마이페이지 방꾸미기 API")
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/{nickname}")
    public ResponseEntity<ResultDto<List<HomeResDto>>> geMyPageMyRoom(@PathVariable String nickname){
        List<HomeResDto> list=myPageService.geMyPageMyRoom(nickname);
        return ResponseEntity.ok(ResultDto.of(list));
    }

    @PostMapping("/{myAssetId}")
    public ResponseEntity<ResultDto<Boolean>> createUserAssetInMyPage(@PathVariable Long myAssetId){
        myPageService.createUserAssetInMyPage(myAssetId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }


    @DeleteMapping("/{myAssetId}")
    public ResponseEntity<ResultDto<Boolean>> deleteUserAssetInMyPage(@PathVariable Long myAssetId){
        myPageService.deleteUserAssetInMyPage(myAssetId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @PutMapping
    public ResponseEntity<ResultDto<Boolean>> updateUserAssetInMyPage(@RequestBody HomeModifyReqDto request){
        myPageService.updateUserAssetInMyPage(request);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

}
