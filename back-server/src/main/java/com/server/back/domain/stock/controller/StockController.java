package com.server.back.domain.stock.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.stock.dto.StockListResDto;
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


}
