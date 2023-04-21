package com.server.back.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SchedulerService {
    @Scheduled(cron = "* * * * * *")
    // 장 선택
    public void market_select() {
        
    }

    @Scheduled(cron = "* * * * * *")
    // 장 마감
    public void market_end() {

    }
}
