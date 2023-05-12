package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.MaterialEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MaterialRepository extends JpaRepository<MaterialEntity, Long> {

    List<MaterialEntity> findAllByStandardTypeAndDateBetween(String type, LocalDate startAt, LocalDate endAt);
}
