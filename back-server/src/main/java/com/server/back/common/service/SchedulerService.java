package com.server.back.common.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.stock.entity.*;
import com.server.back.domain.stock.repository.*;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class SchedulerService {
    private final ChartRepository chartRepository;
    private final CompanyRepository companyRepository;
    private final DealStockRepository dealStockRepository;
    private final MarketRepository marketRepository;
    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final UserDealRepository userDealRepository;
    private final UserService userService;

    // 새로운 장(시즌) 생성 : 주식 분할 시기가 있을 경우의 처리 필요
    @Scheduled(cron = "0 0 9 * * 1,3,5")
    @Transactional
    // 장 선택
    public void market_select() {
        log.info("[schedulerService] 새로운 market(시즌) 선택");
        // 주식 데이터가 2011년 1월 3일부터 시작
        LocalDate pivot = LocalDate.of(2011, 1, 1);
        // 주식 데이터가 2022년 12월 29일로 끝 -> 360개의 데이터를 얻기 위해
        // 2021년 7월 16일부터 시작해야함.
        // LocalDate end = LocalDate.of(2021, 7, 16);

        // 2011년 1월 1일 ~ 2021년 7월 16 : 3849일
        int MAX_VALUE = 3849;
        
        // 랜덤값으로 기준 날짜 계산
        int rand = (int) Math.round(Math.random() * MAX_VALUE);
        LocalDate pivotDate = pivot.plusDays(rand);

        // java.sql.Date 타입으로 반환되므로 LocalDate로 변환하여 사용
        List<Date> marketDate = chartRepository.getMarketDateByDateGreaterThanEqualAndLimit(pivotDate, 360);
        LocalDate start = marketDate.get(0).toLocalDate();
        LocalDate end = marketDate.get(359).toLocalDate();

        // log.info("[schedulerService] new MarketDate : "+start+", "+end);
        // 새로운 장(시즌) 생성
        MarketEntity marketEntity = marketRepository.save(MarketEntity.builder().startAt(start).endAt(end).gameDate(start).build());

        if(marketEntity == null){
            // 생성되지 않았다면 오류 발생
        }

        // log.info("[schedulerService] new MarketEntity : " + marketEntity.getId());
        // 전체 회사 목록 중 4가지 선택
        List<CompanyEntity> companyList = companyRepository.findAll();
        Set<Integer> indexSet = new HashSet<>();
        while(indexSet.size() < 4){
            rand = (int) (Math.random() * companyList.size());
            indexSet.add(rand);
        }
        // log.info("[schedulerService] new indexSet : " + indexSet);
        for(int index : indexSet){
            // 생성할 회사
            CompanyEntity company = companyList.get(index);
            // 게임 기간 동안의 평균가
            Optional<Integer> avgPrice = chartRepository.getAvgPriceEndByDateGreaterThanEqualAndDateLessThanEqualAndCompany(start, end, company.getId());

            if(avgPrice.isPresent()){
                // 게임에 사용할 주식(종목) 생성
                StockEntity stockEntity = stockRepository.save(StockEntity.builder()
                        .market(marketEntity)
                        .company(company)
                        .average(avgPrice.get())
                        .build());

                if(stockEntity == null){
                    // 생성되지 않았다면 오류 발생
                    break;
                }
                // log.info("[schedulerService] new stock : " + stockEntity.getId());
            }
        }
    }

//    @Scheduled(cron = "* 10 22 * * 2,4,6")
    @Scheduled(cron = "* * * * * *")
    // 장 마감
    public void market_end() {
        log.info("[schedulerService] market(시즌) 마감 - 가지고 있는 모든 주식 판매");
        MarketEntity marketEntity = marketRepository.findTopByOrderByCreatedAtDesc().orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        LocalDate now = LocalDate.now();
        if(Period.between(marketEntity.getCreatedAt().toLocalDate(), now).getDays() != 1){
            // 마켓 생성 날짜와 마감 시점의 날짜가 1이 아닌 경우 오류 발생
        }

        LocalDate startDate = marketEntity.getStartAt();// 시작시의 주식 날짜
        LocalDate endDate = marketEntity.getEndAt();    // 마감시의 주식 날짜
        // 이번 장의 종목들
        List<StockEntity> stockEntityList = stockRepository.findTop4ByOrderByIdDesc();
        // 각 종목의 마지막 종가 검색
        // - key : stock_id
        // - value : price_end
        Map<Long, Integer> chartPriceEndMap = new HashMap<>();
        for(StockEntity stockEntity : stockEntityList){
            Long companyId = stockEntity.getCompany().getId();
            ChartEntity chartEntity = chartRepository.findTop360ByCompanyIdAndDateGreaterThanEqual(companyId, startDate).get(359);

            chartPriceEndMap.put(stockEntity.getId(), chartEntity.getPriceEnd());
        }

        // 모든 유저들의 주식 처분
        List<UserEntity> userEntityList = userRepository.findAllByIsDeleted(IsDeleted.N);
        for(UserEntity userEntity : userEntityList){
            Long userId = userEntity.getId();
            UserEntity user = userService.getUserById(userId);
            for(StockEntity stockEntity : stockEntityList){
                Long stockId = stockEntity.getId();
                Optional<UserDealEntity> userDealOptional = userDealRepository.findByUserIdAndStockId(userId, stockId);

                if(userDealOptional.isPresent()) {
                    UserDealEntity userDeal = userDealOptional.get();
                    if(userDeal.getTotalAmount() == 0) continue;
                    // 매도
                    // 1. 주식 판 만큼 돈 더하기
                    user.increaseCurrentMoney(chartPriceEndMap.get(stockId) * userDeal.getTotalAmount());
                    userRepository.save(user);
                    // 2. 거래내역 남기기
                    dealStockRepository.save(DealStockEntity.builder()
                            .user(user)
                            .price(chartPriceEndMap.get(stockId))
                            .dealType(DealType.GET_MONEY_FOR_STOCK)
                            .stockAmount(userDeal.getTotalAmount())
                            .stock(stockEntity)
                            .build());
                    // 3. user_deal 수정
                    userDeal.decrease(userDeal.getTotalAmount());
                    userDealRepository.save(userDeal);
                }
            }
        }
    }

    // 매수, 매도에 따라 종가 변경 추가하기
}
