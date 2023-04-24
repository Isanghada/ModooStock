package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.domain.store.entity.UserAssetLocation;
import com.server.back.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAssetLocationRepository extends JpaRepository<UserAssetLocation,Long> {
    Optional<UserAssetLocation> findByIdAndIsDeletedAndIsInRepositoryAndIsAuctioned(Long id, IsDeleted isDeleted, IsInRespository isInRespository, IsAuctioned isAuctioned);
    List<UserAssetLocation> findAllByUserAndIsDeletedAndIsAuctionedAndIsInRepository(UserEntity user,IsDeleted isDeleted,IsAuctioned isAuctioned,IsInRespository isInRespository);
}
