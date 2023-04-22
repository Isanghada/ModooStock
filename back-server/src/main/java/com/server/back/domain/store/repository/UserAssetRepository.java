package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAssetRepository extends JpaRepository<UserAssetEntity,Long> {
    List<UserAssetEntity>findByUserAndIsInRepositoryAndIsDeleted(UserEntity user, IsInRespository isInRespository, IsDeleted isDeleted);
}
