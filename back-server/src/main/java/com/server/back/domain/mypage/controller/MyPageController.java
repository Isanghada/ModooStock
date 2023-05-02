package com.server.back.domain.mypage.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.mypage.dto.HomeModifyReqDto;
import com.server.back.domain.mypage.dto.HomeResDto;
import com.server.back.domain.mypage.service.MyPageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Api(tags="마이페이지 방꾸미기 API")
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/{nickname}")
    @ApiOperation(value = "마이 룸 반환")
    public ResponseEntity<ResultDto<List<HomeResDto>>> geMyPageMyRoom(@PathVariable String nickname){
        List<HomeResDto> list=myPageService.geMyPageMyRoom(nickname);
        return ResponseEntity.ok(ResultDto.of(list));
    }

    @PostMapping("/{myAssetId}")
    @ApiOperation(value = "에셋 마이룸에 넣기")
    public ResponseEntity<ResultDto<Boolean>> createUserAssetInMyPage(@PathVariable Long myAssetId){
        myPageService.createUserAssetInMyPage(myAssetId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @DeleteMapping("/{myAssetId}")
    @ApiOperation(value = "마이룸에 있는 에셋 인벤토리로 이동")
    public ResponseEntity<ResultDto<Boolean>> deleteUserAssetInMyPage(@PathVariable Long myAssetId){
        myPageService.deleteUserAssetInMyPage(myAssetId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @PutMapping
    @ApiOperation(value = "마이 룸 내의 에셋 위치 옮기기")
    public ResponseEntity<ResultDto<Boolean>> updateUserAssetInMyPage(@RequestBody HomeModifyReqDto request){
        myPageService.updateUserAssetInMyPage(request);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @GetMapping("/{nickname}/visitor")
    @ApiOperation(value = "마이페이지 방문자 수 반환")
    public ResponseEntity<ResultDto<Long>> getVisitorCount(@PathVariable String nickname, HttpServletRequest request, HttpServletResponse response){
        Long visitorCount=myPageService.getVisitorCount(nickname,request,response);
        return ResponseEntity.ok(ResultDto.of(visitorCount));
    }

}
