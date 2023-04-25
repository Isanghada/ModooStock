package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.UserDealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface UserDealRepository extends JpaRepository<UserDealEntity, Long> {

    List<UserDealEntity> findByUserId(Long userId);
    Optional<UserDealEntity> findByUserIdAndStockId(Long userId, Long stockId);
}