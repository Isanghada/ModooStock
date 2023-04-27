package com.server.back.domain.stock.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.news.repository.NewsRepository;
import com.server.back.domain.stock.dto.StockInfoResDto;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.stock.dto.StockResDto;
import com.server.back.domain.stock.service.StockService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
@Api(tags = "주식 API")
public class StockController {
    private final StockService stockService;

    @GetMapping()
    @ApiOperation(value="현재 주식 종목 리스트")
    public ResponseEntity<ResultDto<StockInfoResDto>> getStockList() {
        StockInfoResDto stockInfo = stockService.getStockList();
        return ResponseEntity.ok().body(ResultDto.of(stockInfo));
    }

    @GetMapping(value="/{stockId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ApiOperation(value="선택한 주식 차트 및 나의 주식 정보")
    public ResponseEntity<SseEmitter> getStock(@PathVariable("stockId") Long stockId, HttpServletResponse response){
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");

        return ResponseEntity.ok().body(stockService.getStockChart(stockId));
    }

    @PostMapping()
    @ApiOperation(value="매수")
    public ResponseEntity<ResultDto<Boolean>> buyStock(@RequestBody StockReqDto stockReqDto) {
        stockService.buyStock(stockReqDto);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @DeleteMapping()
    @ApiOperation(value="매도")
    public ResponseEntity<ResultDto<Boolean>> sellStock(@RequestBody StockReqDto stockReqDto){
        stockService.sellStock(stockReqDto);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }



}
