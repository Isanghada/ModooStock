package com.server.back.domain.auction.service;

import com.server.back.domain.auction.dto.AuctionResDto;

import java.util.List;

public interface AuctionService {

    List<AuctionResDto> getAuctionList();

    AuctionResDto getAuctionDetail(Long auctionId);

    Boolean createAuction(Long auctionId);

    Boolean deleteAuction(Long auctionId);
}
