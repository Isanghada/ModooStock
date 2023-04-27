package com.server.back.domain.stock.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.service.AuthService;
import com.server.back.domain.stock.dto.StockInfoResDto;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.stock.dto.StockResDto;
import com.server.back.domain.stock.entity.*;
import com.server.back.domain.stock.repository.*;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;
    private final UserDealRepository userDealRepository;
    private final ChartRepository chartRepository;
    private final UserRepository userRepository;
    private final DealStockRepository dealStockRepository;
    private final MaterialRepository materialRepository;
    private final ExchangeRepository exchangeRepository;
    private final AuthService authService;
    private final UserService userService;

    @Override
    /*
     * 현재 시즌(장)의 종목 list를 조회합니다.
     *
     * @return 현재 시즌 종목 list ( stockId, kind )
     */

    public StockInfoResDto getStockList() {
        List<StockEntity> stockList = stockRepository.findTop4ByOrderByIdDesc();
        List<MaterialEntity> oil = materialRepository.findAllByStandardTypeAndDateBetween("유가", stockList.get(0).getMarket().getStartAt() , stockList.get(0).getMarket().getEndAt());
        List<MaterialEntity> gold = materialRepository.findAllByStandardTypeAndDateBetween("금", stockList.get(0).getMarket().getStartAt() , stockList.get(0).getMarket().getEndAt());
        List<ExchangeEntity> usd = exchangeRepository.findAllByNationalCodeAndDateBetween("미국", stockList.get(0).getMarket().getStartAt() , stockList.get(0).getMarket().getEndAt());
        List<ExchangeEntity> jyp = exchangeRepository.findAllByNationalCodeAndDateBetween("일본", stockList.get(0).getMarket().getStartAt() , stockList.get(0).getMarket().getEndAt());
        List<ExchangeEntity> euro = exchangeRepository.findAllByNationalCodeAndDateBetween("유럽 연합", stockList.get(0).getMarket().getStartAt() , stockList.get(0).getMarket().getEndAt());

        return StockInfoResDto.fromEntity(stockList, oil,gold, usd, jyp, euro);
    }

    @Override
    public SseEmitter getStockChart(Long stockId) {
    // 로그인한 유저 가져오기
    Long userId = authService.getUserId();

    SseEmitter emitter = new SseEmitter();

    // SSE 연결이 설정되면, 해당 사용자에게 데이터를 전송
    emitter.onCompletion(() -> {
        log.info("SSE connection completed");
    });

    emitter.onTimeout(() -> {
        log.info("SSE connection timed out");
    });

    // 장 정보 가져오기
    StockEntity stock = stockRepository.findById(stockId).get();
    LocalDate startDate = stock.getMarket().getStartAt();
    LocalDate gameDate = stock.getMarket().getGameDate();

    Long companyId = stock.getCompany().getId();

    // 주식 chart
    List<ChartEntity> stockChartList = chartRepository.findAllByCompanyIdAndDateBetween(companyId, startDate, gameDate);

    // 유저 보유 주식
    Optional<UserDealEntity> optUserDeal = userDealRepository.findByUserIdAndStockId(userId, stockId);

    StockResDto stockResDto = StockResDto.fromEntity(stockId,optUserDeal, stockChartList);

    // SSE 응답 생성
    try {
        emitter.send(SseEmitter.event().data(stockResDto));
    } catch (IOException e) {
        log.error("SSE send error: {}", e.getMessage());
    }

    return emitter;
}

    @Override
    public void buyStock(StockReqDto stockReqDto) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        StockEntity stock = stockRepository.findById(stockReqDto.getStockId()).get();
        // 종가 가져오기
        Long chartPrice = chartRepository.findByCompanyIdAndDate(stock.getCompany().getId() , stock.getMarket().getGameDate()).get().getPriceEnd();

        // 매수
        // 1. 주식 산 만큼 돈 빼내기
        user.decreaseCurrentMoney(chartPrice * stockReqDto.getStockAmount());
        userRepository.save(user);
        // 2. 거래내역 남기기
        dealStockRepository.save(stockReqDto.toEntity(user, DealType.LOSE_MONEY_FOR_STOCK, stock, chartPrice));


        // 보유 주식 data 수정
        Optional<UserDealEntity> userDeal = userDealRepository.findByUserIdAndStockId(userId, stockReqDto.getStockId());
        if(userDeal.isPresent()){
            userDeal.get().increase(stockReqDto.getStockAmount() , chartPrice);
            userDealRepository.save(userDeal.get());
        }
        else {
            UserDealEntity newDeal = new UserDealEntity(user, stockReqDto, stock , chartPrice);
            userDealRepository.save(newDeal);
        }
    }

    @Override
    public void sellStock(StockReqDto stockReqDto) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        StockEntity stock = stockRepository.findById(stockReqDto.getStockId()).get();
        UserDealEntity userDeal = userDealRepository.findByUserIdAndStockId(userId, stockReqDto.getStockId()).get();
        // 종가 가져오기
        Long chartPrice = chartRepository.findByCompanyIdAndDate(stock.getCompany().getId() , stock.getMarket().getGameDate()).get().getPriceEnd();


        // 매도
        // 1. 주식 판 만큼 돈 더하기
        if(userDeal.getTotalAmount() < stockReqDto.getStockAmount()){
            stockReqDto.setStockAmount(userDeal.getTotalAmount());
        }
        user.increaseCurrentMoney(chartPrice * stockReqDto.getStockAmount());
        userRepository.save(user);
        // 2. 거래내역 남기기
        dealStockRepository.save(stockReqDto.toEntity(user, DealType.GET_MONEY_FOR_STOCK, stock, chartPrice));
        // 3. user_deal 수정
        userDeal.decrease(stockReqDto.getStockAmount(), chartPrice);
        userDealRepository.save(userDeal);
    }


    // 수익률 계산하는 함수
    public void calRate(){
        // 현재 주식 종목 가져오기.
        List<StockEntity> stockList = stockRepository.findTop4ByOrderByIdDesc();

        // 종목마다 종가 들고온 후 계산
        stockList.forEach(stock -> {
            Long chartPrice = chartRepository.findByCompanyIdAndDate(stock.getCompany().getId(), stock.getMarket().getGameDate())
                    .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND)).getPriceEnd();

            List<UserDealEntity> usersDeal = userDealRepository.findAllById(Collections.singleton(stock.getId()));
            usersDeal.forEach(user -> {
                user.calRate(chartPrice);
                userDealRepository.save(user);
            });
        });

    }
}
