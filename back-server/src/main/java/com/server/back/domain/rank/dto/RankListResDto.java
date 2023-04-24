package com.server.back.domain.rank.dto;

import com.server.back.domain.user.dto.UserResDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RankListResDto {
    private UserResDto userResDto;
    private float profitRate;
    private Integer profitMoney;



}
