package com.server.back.common.repository;

import com.server.back.common.entity.DealEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<DealEntity, Long> {
}
