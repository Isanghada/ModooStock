package com.server.back.domain.rank.service;

import com.server.back.domain.rank.dto.RankResDto;

import java.util.List;

public interface RankService {
    List<RankResDto> getRanking();
}
