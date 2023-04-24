package com.server.back.domain.rank.service;

import com.server.back.domain.rank.dto.RankListResDto;

import java.util.List;

public interface RankService {
    List<RankListResDto> getRanking();
}
