package com.server.back.domain.admin.service;

import com.server.back.domain.admin.dto.AdminMarketResDto;
import com.server.back.domain.admin.dto.AdminStockResDto;
import com.server.back.domain.stock.entity.MarketEntity;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.stock.repository.MarketRepository;
import com.server.back.domain.stock.repository.StockRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMarketServiceImpl implements AdminMarketService{
    private final MarketRepository marketRepository;
    private final StockRepository stockRepository;
    /**
     * 모든 장(시즌) 검색합니다.
     *
     * @return       검색된 장들
     */
    @Override
    public List<AdminMarketResDto> getMarketList() {
        List<MarketEntity> marketEntityList = marketRepository.findAll();
        Collections.reverse(marketEntityList);
        return AdminMarketResDto.fromEntityList(marketEntityList);
    }

    /**
     * 선택한 장의 모든 종목을 검색합니다.
     *
     * @return       검색된 종목들
     */
    @Override
    public List<AdminStockResDto> getMarketStockList(Long marketId) {
        List<StockEntity> stockEntityList = stockRepository.findByMarket_Id(marketId);
        if(stockEntityList.isEmpty()) throw new CustomException(ErrorCode.ENTITY_NOT_FOUND);
        return AdminStockResDto.fromEntityList(stockEntityList);
    }
}