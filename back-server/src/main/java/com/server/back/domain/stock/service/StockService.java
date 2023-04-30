package com.server.back.domain.stock.service;

import com.server.back.domain.stock.dto.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface StockService {

    StockInfoResDto getStockList();

    SseEmitter getStockChart(Long stockId);

    DealResDto buyStock(StockReqDto stockReqDto);

    DealResDto sellStock(StockReqDto stockReqDto);
}
