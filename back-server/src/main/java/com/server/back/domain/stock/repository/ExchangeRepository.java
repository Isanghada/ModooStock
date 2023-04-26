package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.ExchangeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity, Long> {

    List<ExchangeEntity> findAllByNationalCodeAndDateBetween(String type, LocalDate startAt, LocalDate endAt);
}
