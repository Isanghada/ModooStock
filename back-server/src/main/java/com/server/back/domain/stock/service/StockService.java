package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDate;

public interface StockService {

    StockInfoResDto getStockList();

    void getStockChart(Long stockId);

    DealResDto buyStock(StockReqDto stockReqDto);

    DealResDto sellStock(StockReqDto stockReqDto);

    SseEmitter subscribe();

    void calRate(LocalDate gameDate);
}
