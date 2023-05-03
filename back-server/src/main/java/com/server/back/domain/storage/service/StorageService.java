package com.server.back.domain.storage.service;

import com.server.back.domain.mypage.dto.MyAssetResDto;

import java.util.List;

public interface StorageService {
    List<MyAssetResDto> getStorageList();
    void createResale(Long myAssetId);

    List<Long> getQuote(Long myAssetId);
}
