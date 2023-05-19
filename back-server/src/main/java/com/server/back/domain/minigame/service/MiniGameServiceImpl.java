package com.server.back.domain.minigame.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.minigame.dto.MiniGameResDto;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Random;


@Slf4j
@Service
@RequiredArgsConstructor
public class MiniGameServiceImpl implements MiniGameService{

    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    private final AuthService authService;

    /**
     * 스피드 로또
     *
     * @return
     */
    @Transactional
    @Override
    public MiniGameResDto createBrightLotto() {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(user.getCreatedAt(), now);
        // if(duration.getSeconds() < 10800) throw new CustomException(ErrorCode.IMPOSSIBLE_FUNCTION);

        if(user.getCurrentMoney()<50000L)throw new CustomException(ErrorCode.LACK_OF_MONEY);
        user.decreaseCurrentMoney(50000L);

        //거래 내역
        DealEntity deal=new DealEntity(user, DealType.LOSE_MONEY_FOR_BLOTTO,50000L);
        dealRepository.save(deal);

        //확률
        Random random=new Random();
        int rd=random.nextInt(1000);

        Integer ranking=5;
        Long money=0L;
        if(rd<7) {
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 30_000_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(30_000_000L);
            ranking=1;
            money=30_000_000L;
        }
        else if(rd>=7&&rd<22){
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 3_000_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(3_000_000L);
            ranking=2;
            money=3_000_000L;
        }
        else if(rd>=22&&rd<52){
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 500_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(500_000L);
            ranking=3;
            money=500_000L;
        }
        else if(rd>=52&&rd<377){
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 10_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(10_000L);
            ranking=4;
            money=10_000L;
        }

        return new MiniGameResDto(ranking,money);

    }

    /**
     * 어둠의 로또
     *
     * @return
     */
    @Transactional
    @Override
    public MiniGameResDto createDarkLotto() {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(user.getCreatedAt(), now);
        // if(duration.getSeconds() < 10800) throw new CustomException(ErrorCode.IMPOSSIBLE_FUNCTION);

        if(user.getCurrentMoney()<1000_000L)throw new CustomException(ErrorCode.LACK_OF_MONEY);
        user.decreaseCurrentMoney(1000_000L);

        //거래 내역
        DealEntity deal=new DealEntity(user, DealType.LOSE_MONEY_FOR_DLOTTO,1000_000L);
        dealRepository.save(deal);

        //확률
        Random random=new Random();
        int rd=random.nextInt(1000);

        Integer ranking=2;
        Long money=0L;
        if(rd<5) {
            money=700_000_000L;
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_DLOTTO, money);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(money);
            ranking=1;
        }

        return new MiniGameResDto(ranking,money);
    }
}
