package com.server.back.domain.store.repository;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserAssetRepository extends JpaRepository<UserAssetEntity,Long> {
    List<UserAssetEntity>findByUserAndIsInRepositoryAndIsDeleted(UserEntity user, IsInRespository isInRespository, IsDeleted isDeleted);
    @Query("SELECT COUNT(u) FROM UserAssetEntity u WHERE u.user.id = :userId AND u.isDeleted = :isDeleted AND u.asset.assetLevel = :assetLevel")
    Optional<Integer> countByUserIdAndIsDeletedAndAssetLevel(@Param("userId") Long userId, @Param("isDeleted") IsDeleted isDeleted, @Param("assetLevel") String assetLevel);

}
