package com.server.back.domain.store.repository;

import com.server.back.domain.store.entity.UserAssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAssetRepository extends JpaRepository<UserAssetEntity,Long> {

}
