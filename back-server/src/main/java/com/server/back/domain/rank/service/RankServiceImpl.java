package com.server.back.domain.rank.service;


import com.server.back.domain.rank.dto.RankListResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankServiceImpl implements  RankService{

    /**
     * 랭킹 세우기
     *
     * @return
     */
    @Override
    public List<RankListResDto> getRanking() {
        return null;
    }
}
