package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.ChartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ChartRepository extends JpaRepository<ChartEntity, Long> {

    List<ChartEntity> findTop360ByCompanyIdAndDateAfter(Long companyId, LocalDate date);
}
