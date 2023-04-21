package com.server.back.domain.stock.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.dto.StockResDto;
import com.server.back.domain.stock.service.StockService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
@Api(tags = "주식 API")
public class StockController {

    private final StockService stockService;

    @GetMapping()
    @ApiOperation(value="현재 주식 종목 리스트")
    public ResponseEntity<ResultDto<List<StockListResDto>>> getStockList() {
        List<StockListResDto> stockListResDto = stockService.getStockList();
        return ResponseEntity.ok().body(ResultDto.of(stockListResDto));
    }

    @GetMapping("/{stockId}")
    @ApiOperation(value="선택한 주식 차트 및 나의 주식 정보")
    public ResponseEntity<ResultDto<StockResDto>> getStock(@PathVariable("stockId") Long stockId){
        StockResDto stockResDto = stockService.getStockChart(stockId);
        return ResponseEntity.ok().body(ResultDto.of(stockResDto));
    }


}
