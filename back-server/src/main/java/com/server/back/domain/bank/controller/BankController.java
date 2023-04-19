package com.server.back.domain.bank.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.bank.dto.BankReqDto;
import com.server.back.domain.bank.dto.MyBankListResDto;
import com.server.back.domain.bank.dto.MyTotalResDto;
import com.server.back.domain.bank.dto.TransferReqDto;
import com.server.back.domain.bank.service.BankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank")
@RequiredArgsConstructor
@Api(tags = "은행 API")
public class BankController {
    private final BankService bankService;

    @PostMapping()
    @ApiOperation(value = "예금을 합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> createBankAccount(@RequestBody BankReqDto bankReqDto) {
        bankService.createBankAccount(bankReqDto);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @DeleteMapping("/{bankId}")
    @ApiOperation(value = "출금을 합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> deleteBankAccount(@PathVariable("bankId") Long bankId) {
        bankService.deleteBankAccount(bankId);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @GetMapping("/total")
    @ApiOperation(value = "내 예금 리스트를 확인합니다.", notes = "")
    public ResponseEntity<ResultDto<MyBankListResDto>> checkBankAccount() {
        MyBankListResDto myBankListResDto = bankService.checkBankAccount();

        return ResponseEntity.ok().body(ResultDto.of(myBankListResDto));
    }

    @GetMapping()
    @ApiOperation(value = "내 통장 잔고를 확인합니다.", notes = "")
    public ResponseEntity<ResultDto<MyTotalResDto>> checkBankTotal() {
        MyTotalResDto myTotalResDto = bankService.checkBankTotal();

        return ResponseEntity.ok().body(ResultDto.of(myTotalResDto));
    }

    @PostMapping("/transfer")
    @ApiOperation(value = "송금합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> transfer(@RequestBody TransferReqDto transferReqDto) {
        bankService.transfer(transferReqDto);

        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

}
