package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.AssetPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssetPriceRepository extends JpaRepository<AssetPriceEntity,Long> {
    Optional<AssetPriceEntity>findByAssetLevel(AssetLevelType assetLevelType);
}
