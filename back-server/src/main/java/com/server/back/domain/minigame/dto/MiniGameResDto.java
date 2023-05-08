package com.server.back.domain.minigame.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class MiniGameResDto {
    private Integer ranking;
    private Long money;

}
