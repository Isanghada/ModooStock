package com.server.back.domain.news.service;

import com.server.back.domain.news.dto.NewsReqDto;
import com.server.back.domain.news.dto.NewsResDto;
import com.server.back.domain.news.dto.StockNewsListResDto;

import java.util.List;

public interface NewsService {
    NewsResDto buyNews(NewsReqDto newsReqDto);

    StockNewsListResDto getStockList();

    List<NewsResDto> getNewsList();
}
