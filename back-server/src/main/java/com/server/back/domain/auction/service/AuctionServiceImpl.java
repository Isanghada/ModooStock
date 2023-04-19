package com.server.back.domain.auction.service;

import com.server.back.domain.auction.dto.AuctionResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService {
    /**
     * 경매 물품 리스트 조회
     *
     * @return
     */
    @Override
    public List<AuctionResDto> getAuctionList() {
        return null;
    }

    /**
     * 경매 물품 상세 조회
     *
     * @param auctionId
     * @return
     */
    @Override
    public AuctionResDto getAuctionDetail(Long auctionId) {
        return null;
    }

    /**
     * 경매 등록
     *
     * @param auctionId
     * @return
     */
    @Override
    public Boolean createAuction(Long auctionId) {
        return null;
    }

    /**
     * 경매 취소
     *
     * @param auctionId
     * @return
     */
    @Override
    public Boolean deleteAuction(Long auctionId) {
        return null;
    }
}
