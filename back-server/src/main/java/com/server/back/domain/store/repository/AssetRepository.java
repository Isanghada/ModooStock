package com.server.back.domain.store.repository;

import com.server.back.domain.store.entity.AssetEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AssetRepository extends JpaRepository<AssetEntity,Long> {
    @Query(value = "SELECT * FROM asset WHERE asset_level = :assetLevelType ORDER BY RAND() LIMIT 1", nativeQuery = true)
    AssetEntity findByAssetLevelAndLimit(@Param("assetLevelType") String assetLevelType);

}
