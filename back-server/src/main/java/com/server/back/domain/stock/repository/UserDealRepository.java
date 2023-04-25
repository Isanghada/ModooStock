package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.UserDealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDealRepository extends JpaRepository<UserDealEntity, Long> {

    Optional<UserDealEntity> findByUserIdAndStockId(Long userId, Long stockId);
}