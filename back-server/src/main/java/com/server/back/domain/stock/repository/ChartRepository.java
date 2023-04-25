package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.ChartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChartRepository extends JpaRepository<ChartEntity, Long> {

    List<ChartEntity> findTop360ByCompanyIdAndDateAfter(Long companyId, LocalDateTime date);
    Optional<ChartEntity> findByCompanyIdAndDate(Long companyId, LocalDateTime date);
}
