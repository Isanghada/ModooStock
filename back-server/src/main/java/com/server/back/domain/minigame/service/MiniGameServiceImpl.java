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

        if(user.getCurrentMoney()<10000L)throw new CustomException(ErrorCode.LACK_OF_MONEY);
        user.decreaseCurrentMoney(10000L);

        //거래 내역
        DealEntity deal=new DealEntity(user, DealType.LOSE_MONEY_FOR_BLOTTO,10000L);
        dealRepository.save(deal);

        //확률
        Random random=new Random();
        int rd=random.nextInt(1000);

        Integer ranking=5;
        Long money=0L;
        if(rd<7) {
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 50_000_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(50_000_000L);
            ranking=1;
            money=50_000_000L;
        }
        else if(rd>=7&&rd<27){
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 3_000_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(3_000_000L);
            ranking=2;
            money=3_000_000L;
        }
        else if(rd>=27&&rd<77){
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_BLOTTO, 500_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(500_000L);
            ranking=3;
            money=500_000L;
        }
        else if(rd>=77&&rd<377){
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
            DealEntity dealPlus = new DealEntity(user, DealType.GET_MONEY_FOR_DLOTTO, 10_000_000_000L);
            dealRepository.save(dealPlus);
            user.increaseCurrentMoney(700_000_000L);
            ranking=1;
            money=700_000_000L;
        }

        return new MiniGameResDto(ranking,money);
    }
}
