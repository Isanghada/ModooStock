package com.server.back.domain.rank.repository;

import com.server.back.domain.rank.entity.RankEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankRepository extends JpaRepository<RankEntity,Long> {
}
