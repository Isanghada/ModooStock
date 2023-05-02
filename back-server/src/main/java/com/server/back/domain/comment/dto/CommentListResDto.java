package com.server.back.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CommentListResDto {
    private AuthorResDto authorResDto;
    private CommentResDto commentResDto;

    public static CommentListResDto toDto(AuthorResDto authorResDto, CommentResDto commentResDto){
        return CommentListResDto.builder()
                .authorResDto(authorResDto)
                .commentResDto(commentResDto)
                .build();
    }
}
