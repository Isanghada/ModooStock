package com.server.back.domain.rank.dto;

import com.server.back.domain.rank.entity.RankEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RankResDto {
    private String nickname;
    private String profileImagePath;
    private Long totalMoney;

    public static RankResDto fromEntity(RankEntity rank){
        return RankResDto.builder()
                .nickname(rank.getNickname())
                .profileImagePath(rank.getProfileImagePath())
                .totalMoney(rank.getTotalMoney())
                .build();
    }
    public static List<RankResDto> fromEntityList(List<RankEntity>list){
        return list.stream().map(RankResDto::fromEntity).collect(Collectors.toList());

    }


}
