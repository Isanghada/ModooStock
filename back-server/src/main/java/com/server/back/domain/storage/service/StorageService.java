package com.server.back.domain.storage.service;

import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.storage.dto.AuctionHistoryResDto;

import java.util.List;

public interface StorageService {
    List<MyAssetResDto> getStorageList();
    void createResale(Long myAssetId);

    List<Long> getQuote(Long myAssetId);

    List<AuctionHistoryResDto> getAuctionHistory(Long myAssetId);
}
