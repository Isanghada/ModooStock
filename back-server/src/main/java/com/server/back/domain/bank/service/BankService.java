package com.server.back.domain.bank.service;

import com.server.back.domain.bank.dto.BankReqDto;
import com.server.back.domain.bank.dto.MyBankListResDto;
import com.server.back.domain.bank.dto.MyTotalResDto;
import com.server.back.domain.bank.dto.TransferReqDto;

public interface BankService {
    void createBankAccount(BankReqDto bankReqDto);
    void deleteBankAccount(Long bankId);

    MyBankListResDto checkBankAccount();

    MyTotalResDto checkBankTotal();

    void transfer(TransferReqDto transferReqDto);
}
