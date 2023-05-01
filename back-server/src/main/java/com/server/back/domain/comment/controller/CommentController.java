package com.server.back.domain.comment.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.comment.dto.CommentListResDto;
import com.server.back.domain.comment.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@Api(tags="방명록 관련 API")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    @ApiOperation(value = "방명록 리스트 반환")
    public ResponseEntity<ResultDto<List<CommentListResDto>>> getCommentList(@RequestParam String nickname){
        List<CommentListResDto> commentList=commentService.getCommentList(nickname);
        return ResponseEntity.ok(ResultDto.of(commentList));
    }

    @PostMapping
    @ApiOperation(value = "방명록 작성")
    public ResponseEntity<ResultDto<Boolean>> createComment(@RequestParam String nickname,@RequestBody String content){
        commentService.createComment(nickname,content);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @PutMapping("/{commentId}")
    @ApiOperation(value = "방명록 수정")
    public ResponseEntity<ResultDto<Boolean>> updateComment(@PathVariable Long commentId,@RequestBody String content){
        commentService.updateComment(commentId,content);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());

    }

    @DeleteMapping("/{commentId}")
    @ApiOperation(value = "방명록 삭제")
    public ResponseEntity<ResultDto<Boolean>> deleteComment(@PathVariable Long commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());

    }
}
