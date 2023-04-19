package com.server.back.domain.auction.repository;

import com.server.back.domain.auction.entity.AuctionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<AuctionEntity, Long> {

}
