package com.server.back.domain.news.dto;

import com.server.back.domain.news.entity.NewsEntity;
import com.server.back.domain.news.entity.UserNewsEntity;
import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.entity.StockEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class NewsResDto {
    private String kind;
    private String content;
    private LocalDate date;

    public static NewsResDto fromEntity(NewsEntity news) {
        return NewsResDto.builder()
                .kind(news.getCompany().getKind())
                .content(news.getContent())
                .date(news.getDate())
                .build();
    }

    public static List<NewsResDto> fromEntityList(List<UserNewsEntity> userNews){
        return userNews.stream().map(n -> NewsResDto.fromEntity(n.getNews())).collect(Collectors.toList());
    }

}
