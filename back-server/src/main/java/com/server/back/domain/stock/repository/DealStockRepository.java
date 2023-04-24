package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.DealStockEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealStockRepository extends JpaRepository<DealStockEntity, Long> {

}
