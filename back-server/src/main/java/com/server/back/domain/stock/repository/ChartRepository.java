package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.ChartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChartRepository extends JpaRepository<ChartEntity, Long> {

    List<ChartEntity> findTop360ByCompanyIdAndDateGreaterThanEqual(Long companyId, LocalDate date);
    Optional<ChartEntity> findByCompanyIdAndDate(Long companyId, LocalDate date);

    List<ChartEntity> findAllByCompanyIdAndDateBetween(Long companyId, LocalDate startDate, LocalDate date);
}
