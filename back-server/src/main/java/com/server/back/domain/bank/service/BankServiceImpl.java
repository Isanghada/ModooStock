package com.server.back.domain.bank.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.bank.dto.BankReqDto;
import com.server.back.domain.bank.dto.MyBankResDto;
import com.server.back.domain.bank.dto.MyTotalResDto;
import com.server.back.domain.bank.dto.TransferReqDto;
import com.server.back.domain.bank.entity.BankEntity;
import com.server.back.domain.bank.repository.BankRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {
    private final BankRepository bankRepository;
    private final DealRepository dealRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final UserService userService;

    public static Integer BANK_PERIOD = 6;

    /**
     * 예금하기
     * 
     * @param bankReqDto price 예금한 돈
     */
    @Override
    @Transactional
    public void createBankAccount(BankReqDto bankReqDto) {
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        
        // 유자가 보유한 돈 빼내기
        user.decreaseCurrentMoney(bankReqDto.getPrice());
        userRepository.save(user);
        
        // 은행에 통장 개설
        bankRepository.save(bankReqDto.toEntity(user));
    }

    /**
     * 출금하기 (계좌/통장 해지)
     * 
     * @param bankId 해지할 통장ID
     */
    @Override
    @Transactional
    public void deleteBankAccount(Long bankId) {
        // 로그인한 유저 가져오기
        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        
        // 통장에서 돈 출금
        BankEntity bank = bankRepository.findByIdAndAndIsCompleted(bankId, IsCompleted.N).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        bank.setIsCompleted(IsCompleted.Y);
        bankRepository.save(bank);

        // 기본으로 은행에 넣었던 돈 얻기
        Integer getMoney = bank.getPrice();
        // 만기일
        LocalDateTime endDate = bank.getCreatedAt().plusHours(BANK_PERIOD);
        
        // 만기가 지났다면 이자 추가
        if (LocalDateTime.now().isAfter(endDate)){
            getMoney += bank.getInterest();
        }
        // 거래 내역 생성
        DealEntity deal = DealEntity.builder()
                .user(user)
                .price(getMoney)
                .dealType(DealType.GET_MONEY_FOR_DEPOSIT)
                .build();
        dealRepository.save(deal);
        
        // 현재 보유돈에 출금한 돈 추가
        user.increaseCurrentMoney(getMoney);
        userRepository.save(user);

    }

    /**
     * 내 예금 리스트를 확인합니다.
     *
     * @return 내 예금 리스트
     */
    @Override
    public List<MyBankResDto> getBankAccountList() {
        Long userId = authService.getUserId();
        List<BankEntity> bankList = bankRepository.findByUserIdAndIsCompleted(userId, IsCompleted.N);

        return MyBankResDto.fromEnityList(bankList);
    }

    /**
     * 총 예금 금액을 확인합니다.
     * 
     * @return 총 예금 금액
     */
    @Override
    public MyTotalResDto getBankTotal() {
        Long userId = authService.getUserId();

        // 총 예금 금액
        Integer currentMoney = bankRepository.getPriceSumByUserIdAndIsCompleted(userId, IsCompleted.N).orElse(0);
        return MyTotalResDto.fromEntity(currentMoney);
    }

    /**
     * 송금합니다.
     *
     * @param transferReqDto 송금 정보
     */
    @Override
    @Transactional
    public void transfer(TransferReqDto transferReqDto) {
        Long userId = authService.getUserId();
        // 돈을 보내는 사람
        UserEntity sender = userService.getUserById(userId);
        // 돈을 받는 사람
        UserEntity receiver = userService.getUserByNickname(transferReqDto.getReceiver());

        // 돈을 보내는 사람의 현재 보유돈 보다 작은지 확인
        if(sender.getCurrentMoney() < transferReqDto.getMoney()){
            throw new CustomException(ErrorCode.ENTITY_NOT_FOUND);
        }
        
        // 현재 보유돈 보다 작을 경우 돈을 보냄
        // sender currentMoney 줄이기
        sender.decreaseCurrentMoney(transferReqDto.getMoney());

        // 거래 내역 생성
        DealEntity senderDeal = DealEntity.builder()
                .user(sender)
                .price(transferReqDto.getMoney())
                .dealType(DealType.LOSE_MONEY_FOR_TRANSFER)
                .build();
        dealRepository.save(senderDeal);
        
        // receiver currentMoney 늘이기
        receiver.increaseCurrentMoney(transferReqDto.getMoney());
        
        // 거래내역 남기기
        DealEntity receiverDeal = DealEntity.builder()
                .user(receiver)
                .price(transferReqDto.getMoney())
                .dealType(DealType.GET_MONEY_FOR_TRANSFER)
                .build();
        dealRepository.save(receiverDeal);
    }
}
