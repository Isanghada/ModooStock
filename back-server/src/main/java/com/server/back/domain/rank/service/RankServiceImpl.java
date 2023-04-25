package com.server.back.domain.rank.service;


import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.rank.dto.RankListResDto;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankServiceImpl implements  RankService{

    private final UserRepository userRepository;

    /**
     * 랭킹 세우기
     *
     * @return
     */

    @Scheduled(cron = "0 0 10-22 * * 1-6",zone = "Asia/Seoul")
    @Override
    public List<RankListResDto> getRanking() {
        //탈퇴하지 않은 모든 유저에 대해서
        List<UserEntity> everyUser=userRepository.findAllByIsDeleted(IsDeleted.N);
        for (UserEntity user: everyUser) {
            //로직 구현
        }
        return null;
    }
}
