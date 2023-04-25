package com.server.back.domain.rank.service;


import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.rank.dto.RankListResDto;
import com.server.back.domain.rank.entity.RankEntity;
import com.server.back.domain.rank.repository.RankRepository;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.CompanyEntity;
import com.server.back.domain.stock.entity.MarketEntity;
import com.server.back.domain.stock.entity.UserDealEntity;
import com.server.back.domain.stock.repository.ChartRepository;
import com.server.back.domain.stock.repository.MarketRepository;
import com.server.back.domain.stock.repository.UserDealRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankServiceImpl implements  RankService{

    private final UserRepository userRepository;
    private final RankRepository rankRepository;
    private final UserDealRepository userDealRepository;
    private final MarketRepository marketRepository;
    private final ChartRepository chartRepository;

    /**
     * 랭킹 세우기
     *
     * @return
     */

    @Scheduled(cron = "0 0 10-22 * * 1-6",zone = "Asia/Seoul")
    @Override
    public List<RankListResDto> getRanking() {

        //랭킹 레퍼지토리 전체 삭제
        rankRepository.deleteAll();

        //탈퇴하지 않은 모든 유저에 대해서
        List<UserEntity> everyUser=userRepository.findAllByIsDeleted(IsDeleted.N);
        for (UserEntity user: everyUser) {
            //로직 구현
            Integer totalMoney=0;

            //현금
            totalMoney+=user.getCurrentMoney();

            //주식
            //현재 장 가지고 오기
            MarketEntity market =marketRepository.findTopByOrderByCreatedAtDesc().orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));
            LocalDate date=market.getGameDate();
            Long marketId=market.getId();

            List<UserDealEntity>stockList=userDealRepository.findAllByUserAndStockMarketId(user,marketId);

            for (UserDealEntity userDeal:stockList) {
                int amount=userDeal.getTotalAmount();
                CompanyEntity company =userDeal.getStock().getCompany();
                ChartEntity chart=chartRepository.findByCompanyIdAndDate(company.getId(),date).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND
                ));
                totalMoney+=amount*(chart.getPriceEnd()*amount);
            }


            RankEntity rank=RankEntity.builder()
                    .nickname(user.getNickname())
                    .profileImagePath(user.getProfileImagePath())
                    .build();
            rankRepository.save(rank);


        }
        return null;
    }
}
