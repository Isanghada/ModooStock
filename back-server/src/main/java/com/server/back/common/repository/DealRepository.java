package com.server.back.common.repository;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.entity.DealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DealRepository extends JpaRepository<DealEntity, Long> {
    Optional<DealEntity> findByUserIdAndDealTypeAndCreatedAtGreaterThanEqual(Long userId, DealType dealType, LocalDateTime startDatetime);

    List<DealEntity> findByUserId(Long userId);
}
