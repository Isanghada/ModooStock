package com.server.back.domain.minigame.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MiniGameResDto {
    private Integer ranking;
    private Long money;

}
