package com.server.back.domain.stock.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.service.AuthService;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.stock.dto.StockResDto;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.DealStockEntity;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.stock.entity.UserDealEntity;
import com.server.back.domain.stock.repository.ChartRepository;
import com.server.back.domain.stock.repository.DealStockRepository;
import com.server.back.domain.stock.repository.StockRepository;
import com.server.back.domain.stock.repository.UserDealRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;
    private final UserDealRepository userDealRepository;
    private final ChartRepository chartRepository;
    private final UserRepository userRepository;
    private final DealStockRepository dealStockRepository;
    private final AuthService authService;
    private final UserService userService;

    @Override
    /*
     * 현재 시즌(장)의 종목 list를 조회합니다.
     *
     * @return 현재 시즌 종목 list ( stockId, kind )
     */

    public List<StockListResDto> getStockList() {
        List<StockEntity> stockList = stockRepository.findTop4ByOrderByIdDesc();
        return StockListResDto.fromEntityList(stockList);
    }

    @Override
    public StockResDto getStockChart(Long stockId) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();

        // 장 정보 가져오기
        StockEntity stock = stockRepository.findById(stockId).get();
        LocalDateTime date = stock.getMarket().getStartAt();
        Long companyId = stock.getCompany().getId();

        // 주식 chart
        List<ChartEntity> stockChartList = chartRepository.findTop360ByCompanyIdAndDateAfter(companyId, date);

        // 유저 보유 주식
        UserDealEntity userDeal = userDealRepository.findByUserIdAndStockId(userId, stockId);

        return StockResDto.fromEntity(stockId,userDeal, stockChartList);
    }

    @Override
    public void buyStock(StockReqDto stockReqDto) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        StockEntity stock = stockRepository.findById(stockReqDto.getStockId()).get();

        // 매수
        // 1. 주식 산 만큼 돈 빼내기
        user.decreaseCurrentMoney(stockReqDto.getPrice() * stockReqDto.getStockAmount());
        userRepository.save(user);
        // 2. 거래내역 남기기
        dealStockRepository.save(stockReqDto.toEntity(user, DealType.LOSE_MONEY_FOR_STOCK, stock));


        // 보유 주식 data 수정
        // 있을 경우
        UserDealEntity userDeal = userDealRepository.findByUserIdAndStockId(userId, stockReqDto.getStockId());
        if(userDeal != null){
            userDeal.increase(stockReqDto.getPrice(), stockReqDto.getStockAmount());
            userDealRepository.save(userDeal);
        }
        else {
            UserDealEntity newDeal = new UserDealEntity(user, stockReqDto, stock);
            userDealRepository.save(newDeal);
        }
    }

    @Override
    public void sellStock(StockReqDto stockReqDto) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        StockEntity stock = stockRepository.findById(stockReqDto.getStockId()).get();
        UserDealEntity userDeal = userDealRepository.findByUserIdAndStockId(userId, stockReqDto.getStockId());

        // 매도
        // 1. 주식 판 만큼 돈 더하기
        if(userDeal.getTotalAmount() < stockReqDto.getStockAmount()){
            stockReqDto.setStockAmount(userDeal.getTotalAmount());
        }
        user.increaseCurrentMoney(stockReqDto.getPrice() * stockReqDto.getStockAmount());
        userRepository.save(user);
        // 2. 거래내역 남기기
        dealStockRepository.save(stockReqDto.toEntity(user, DealType.GET_MONEY_FOR_STOCK, stock));
        // 3. user_deal 수정
        userDeal.decrease(stockReqDto.getStockAmount());
        userDealRepository.save(userDeal);

    }
}
