package com.server.back.domain.admin.service;

import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.domain.admin.dto.AdminDealResDto;
import com.server.back.domain.stock.entity.DealStockEntity;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminDealServiceImpl implements AdminDealService{
    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    /**
     * 모든 거래 내역을 반환합니다.
     *
     * @return       검색된 거래 내역들
     */
    @Override
    public List<AdminDealResDto> getDealList() {
        List<DealEntity> dealEntityList = dealRepository.findAll();
        return AdminDealResDto.fromEntityList(dealEntityList);
    }
    /**
     * 검색한 사용자의 거래 내역을 반환합니다.
     *
     * @return       검색된 거래 내역들
     */
    @Override
    public List<AdminDealResDto> getDealList(String account) {
        UserEntity userEntity = userRepository.findByAccount(account).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<DealEntity> dealEntityList = dealRepository.findByUserId(userEntity.getId());
        return AdminDealResDto.fromEntityList(dealEntityList);
    }
}