package com.server.back.domain.bank.service;

import com.server.back.domain.bank.dto.BankReqDto;
import com.server.back.domain.bank.dto.MyBankResDto;
import com.server.back.domain.bank.dto.MyTotalResDto;
import com.server.back.domain.bank.dto.TransferReqDto;

import java.util.List;

public interface BankService {
    void createBankAccount(BankReqDto bankReqDto);
    void deleteBankAccount(Long bankId);
    List<MyBankResDto> getBankAccountList();
    MyTotalResDto getBankTotal();
    void transfer(TransferReqDto transferReqDto);
}
