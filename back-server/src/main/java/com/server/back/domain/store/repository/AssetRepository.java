package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface AssetRepository extends JpaRepository<AssetEntity,Long> {
    @Query(value = "SELECT * FROM asset WHERE asset_level = :assetLevelType ORDER BY RAND() LIMIT :limitValue", nativeQuery = true)
    List<AssetEntity> findAllByAssetLevelAndLimit(@Param("assetLevelType") String assetLevelType, @Param("limitValue") int limitValue);

}
