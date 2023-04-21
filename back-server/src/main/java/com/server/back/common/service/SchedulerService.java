package com.server.back.common.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
@Slf4j
public class SchedulerService {
//    @Scheduled(cron = "* * * * * *")
//    // 장 선택
//    public void market_select() {
//        // 주식 데이터가 2011년 1월 3일부터 시작
//        LocalDateTime start = LocalDateTime.of(2011, 1, 3, 0, 0, 0);
//        // 주식 데이터가 2022년 12월 29일로 끝 -> 360개의 데이터를 얻기 위해
//        // 2021년 7월 16일부터 시작해야함.
//        LocalDateTime end = LocalDateTime.of(2021, 7, 16, 0, 0, 0);
//        Duration duration = Duration.between(start, end);
//        log.info("[schedule] : diff - "+duration.getSeconds()+"(s)");
//    }

//    @Scheduled(cron = "* * * * * *")
//    // 장 마감
//    public void market_end() {
//
//    }
}
