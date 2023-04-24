package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.UserDealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDealRepository extends JpaRepository<UserDealEntity, Long> {

    UserDealEntity findByUserIdAndStockId(Long userId, Long stockId);
    List<UserDealEntity> findByUserId(Long userId);
}