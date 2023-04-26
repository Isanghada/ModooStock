package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.MarketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarketRepository extends JpaRepository<MarketEntity,Long> {
    Optional<MarketEntity> findTopByOrderByCreatedAtDesc();
}
