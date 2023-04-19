package com.server.back.domain.bank.service;

import com.server.back.domain.bank.dto.BankReqDto;
import com.server.back.domain.bank.dto.MyBankListResDto;
import com.server.back.domain.bank.dto.MyTotalResDto;
import com.server.back.domain.bank.dto.TransferReqDto;
import com.server.back.domain.bank.repository.BankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {
    private final BankRepository bankRepository;

    /**
     * 예금하기
     * 
     * @param bankReqDto price 예금한 돈
     */
    @Override
    @Transactional
    public void createBankAccount(BankReqDto bankReqDto) {

    }

    /**
     * 출금하기 (계좌/통장 해지)
     * 
     * @param bankId 해지할 통장ID
     */
    @Override
    @Transactional
    public void deleteBankAccount(Long bankId) {

    }

    /**
     * 내 예금 리스트를 확인합니다.
     *
     * @return 내 예금 리스트
     */
    @Override
    public MyBankListResDto checkBankAccount() {
        return null;
    }

    /**
     * 총 예금 금액을 확인합니다.
     * 
     * @return 총 예금 금액
     */
    @Override
    public MyTotalResDto checkBankTotal() {
        return null;
    }

    /**
     * 송금합니다.
     *
     * @param transferReqDto 송금 정보
     */
    @Override
    @Transactional
    public void transfer(TransferReqDto transferReqDto) {

    }
}
