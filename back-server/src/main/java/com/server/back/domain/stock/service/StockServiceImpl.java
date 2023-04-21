package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockResDto;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;

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
        return null;
    }
}
