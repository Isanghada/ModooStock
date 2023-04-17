package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetRepository extends JpaRepository<AssetEntity,Long> {
    @Query(value = "SELECT * FROM asset order by RAND() limit 1",nativeQuery = true)
    List<AssetEntity> findAllByAssetLevel(AssetLevelType assetLevelType);
}
