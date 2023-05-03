package com.server.back.domain.auction.repository;

import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.auction.entity.AuctionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuctionRepository extends JpaRepository<AuctionEntity, Long> {
    List<AuctionEntity> findAllByIsDeletedAndIsCompletedOrderByCreatedAtDesc(IsDeleted isDeleted,IsCompleted isCompleted);
    Optional<AuctionEntity> findByIdAndIsDeletedAndIsCompleted(Long auctionId, IsDeleted isDeleted, IsCompleted isCompleted);
    List<AuctionEntity> findAllByUserAssetUserIdAndIsCompletedAndIsDeletedOrderByCreatedAtDesc(Long userId,IsCompleted isCompleted,IsDeleted isDeleted);
    List<AuctionEntity> findAllByUserAssetAssetIdAndIsCompletedAndIsDeletedOrderByCreatedAtDesc(Long assetId,IsCompleted isCompleted,IsDeleted isDeleted);
}
