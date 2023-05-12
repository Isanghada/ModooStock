package com.server.back.domain.comment.dto;

import com.server.back.domain.comment.entity.CommentEntity;
import lombok.*;

@Data
@Builder
public class CommentResDto {
    private Long commentId;
    private String content;

    public static CommentResDto fromEntity(CommentEntity comment){

        return CommentResDto.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .build();

    }

}
