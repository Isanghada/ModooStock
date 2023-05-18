package com.server.back.domain.comment.service;

import com.server.back.domain.comment.dto.CommentListResDto;

import java.util.List;

public interface CommentService {
    List<CommentListResDto> getCommentList(String nickname);

    void createComment(String nickname,String content);

    void updateComment(Long commentId, String content);

    void deleteComment(Long commentId);
}
