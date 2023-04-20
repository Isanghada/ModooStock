package com.server.back.domain.auction.service;

import com.server.back.domain.auction.dto.AuctionReqDto;
import com.server.back.domain.auction.dto.AuctionResDto;

import java.util.List;

public interface AuctionService {

    List<AuctionResDto> getAuctionList();

    AuctionResDto getAuctionDetail(Long auctionId);

    void participateAuction(Long auctionId);

    void deleteAuction(Long auctionId);

    void createAuction(AuctionReqDto auctionReqDto);
}
