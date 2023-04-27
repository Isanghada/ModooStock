package com.server.back.domain.rank.service;


import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.bank.repository.BankRepository;
import com.server.back.domain.rank.dto.RankResDto;
import com.server.back.domain.rank.entity.RankEntity;
import com.server.back.domain.rank.repository.RankRepository;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.CompanyEntity;
import com.server.back.domain.stock.entity.MarketEntity;
import com.server.back.domain.stock.entity.UserDealEntity;
import com.server.back.domain.stock.repository.ChartRepository;
import com.server.back.domain.stock.repository.MarketRepository;
import com.server.back.domain.stock.repository.UserDealRepository;
import com.server.back.domain.store.repository.AssetPriceRepository;
import com.server.back.domain.store.repository.UserAssetRepository;
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
    private final BankRepository bankRepository;
    private final UserAssetRepository userAssetRepository;
    private final AssetPriceRepository assetPriceRepository;

    /**
     * 랭킹 가져오기
     *
     * @return
     */
    @Override
    public List<RankResDto> getRanking() {
        List<RankEntity>list=rankRepository.findTop10ByOrderByTotalMoneyDesc();
        return RankResDto.fromEntityList(list);
    }


    /**
     * 랭킹 세우는 로직
     * 한 시간에 한 번 계산
     *
     */
    @Scheduled(cron = "0 0 10-22 * * 1-6",zone = "Asia/Seoul")
    public void calRanking(){

        //랭킹 레퍼지토리 전체 삭제
        rankRepository.deleteAll();

        //탈퇴하지 않은 모든 유저에 대해서
        List<UserEntity> everyUser=userRepository.findAllByIsDeleted(IsDeleted.N);
        for (UserEntity user: everyUser) {
            //로직 구현
            Long totalMoney = 0L;

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
                totalMoney+=(chart.getPriceEnd()*amount);
            }

            //예금에 있는 거
            Long bankMoney = bankRepository.getPriceSumByUserIdAndIsCompleted(user.getId(), IsCompleted.N).orElse(0L);
            totalMoney+=bankMoney;


            //userAsset에 따른 금액 책정
            //unique
            Integer uniqueCnt=userAssetRepository.countByUserIdAndIsDeletedAndAssetLevel(user.getId(),IsDeleted.N, AssetLevelType.UNIQUE).orElse(0);
            Long uniquePrice=assetPriceRepository.findByAssetLevel(AssetLevelType.UNIQUE).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getPrice();
            totalMoney+=(uniquePrice*uniqueCnt);

            //epic
            Integer epicCnt=userAssetRepository.countByUserIdAndIsDeletedAndAssetLevel(user.getId(),IsDeleted.N, AssetLevelType.EPIC).orElse(0);
            Long epicPrice=assetPriceRepository.findByAssetLevel(AssetLevelType.EPIC).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getPrice();
            totalMoney+=(epicPrice*epicCnt);

            //rare
            Integer rareCnt=userAssetRepository.countByUserIdAndIsDeletedAndAssetLevel(user.getId(),IsDeleted.N, AssetLevelType.RARE).orElse(0);
            Long rarePrice=assetPriceRepository.findByAssetLevel(AssetLevelType.RARE).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getPrice();
            totalMoney+=(rarePrice*rareCnt);


            RankEntity rank=RankEntity.builder()
                    .nickname(user.getNickname())
                    .totalMoney(totalMoney)
                    .profileImagePath(user.getProfileImagePath())
                    .build();

            rankRepository.save(rank);

        }

    }
}
