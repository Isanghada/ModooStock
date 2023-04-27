package com.server.back.domain.news.dto;

import com.server.back.domain.news.entity.NewsEntity;
import com.server.back.domain.news.entity.UserNewsEntity;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsReqDto {
    Long stockId;

    public UserNewsEntity toEntity(UserEntity user, NewsEntity news){
        return UserNewsEntity.builder()
                .user(user)
                .news(news)
                .build();
    }

}
