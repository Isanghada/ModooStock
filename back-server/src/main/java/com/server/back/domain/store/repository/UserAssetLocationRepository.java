package com.server.back.domain.store.repository;

import com.server.back.domain.store.entity.UserAssetLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAssetLocationRepository extends JpaRepository<UserAssetLocation,Long> {
}
