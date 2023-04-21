package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.StockListResDto;

import java.util.List;

public interface StockService {

    List<StockListResDto> getStockList();
}
