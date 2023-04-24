package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.dto.StockListResDto;
import com.server.back.domain.stock.entity.StockEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.*;

public interface StockRepository extends JpaRepository<StockEntity, Long> {

    List<StockEntity> findTop4ByOrderByIdDesc();

}
