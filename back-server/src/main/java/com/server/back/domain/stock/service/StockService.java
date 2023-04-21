package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockResDto;

import java.util.List;

public interface StockService {

    List<StockListResDto> getStockList();

    StockResDto getStockChart(Long stockId);
}
