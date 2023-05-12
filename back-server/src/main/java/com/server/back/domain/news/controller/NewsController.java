package com.server.back.domain.news.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.news.dto.NewsReqDto;
import com.server.back.domain.news.dto.NewsResDto;
import com.server.back.domain.news.dto.StockNewsListResDto;
import com.server.back.domain.news.service.NewsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/info")
@RequiredArgsConstructor
@Api(tags = "뉴스 API")
public class NewsController {
    private final NewsService newsService;

    @GetMapping()
    @ApiOperation(value="현재 주식 종목 리스트 조회")
    public ResponseEntity<ResultDto<StockNewsListResDto>> getStockList() {
        StockNewsListResDto stockNewsListResDto = newsService.getStockList();
        return ResponseEntity.ok().body(ResultDto.of(stockNewsListResDto));
    }

    @PostMapping("/buy")
    @ApiOperation(value="선택한 종목의 뉴스 구입")
    public ResponseEntity<ResultDto<NewsResDto>> buyNews(@RequestBody NewsReqDto newsReqDto){
        NewsResDto newsResDto = newsService.buyNews(newsReqDto);
        return ResponseEntity.ok().body(ResultDto.of(newsResDto));
    }
    @GetMapping("/mine")
    @ApiOperation(value="구매한 뉴스 조회")
    public ResponseEntity<ResultDto<List<NewsResDto>>> getMyNews(){
        List<NewsResDto> myNews = newsService.getNewsList();
        return ResponseEntity.ok().body(ResultDto.of(myNews));
    }
}
