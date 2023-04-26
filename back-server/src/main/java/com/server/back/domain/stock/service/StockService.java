package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.StockInfoResDto;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.stock.dto.StockResDto;

import java.util.List;

public interface StockService {

    StockInfoResDto getStockList();

    StockResDto getStockChart(Long stockId);

    void buyStock(StockReqDto stockReqDto);

    void sellStock(StockReqDto stockReqDto);
}
