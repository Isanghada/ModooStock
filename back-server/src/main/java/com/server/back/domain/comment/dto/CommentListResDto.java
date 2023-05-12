package com.server.back.domain.comment.dto;

import com.server.back.common.code.commonCode.IsAuthor;
import lombok.*;

@Data
@Builder
public class CommentListResDto {
    private AuthorResDto authorResDto;
    private CommentResDto commentResDto;
    private IsAuthor isAuthor;

    public static CommentListResDto toDto(AuthorResDto authorResDto, CommentResDto commentResDto,IsAuthor isAuthor){
        return CommentListResDto.builder()
                .isAuthor(isAuthor)
                .authorResDto(authorResDto)
                .commentResDto(commentResDto)
                .build();
    }
}
