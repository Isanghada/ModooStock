package com.server.back.domain.storage.service;

import com.server.back.domain.mypage.dto.MyAssetResDto;

import java.util.List;

public interface StorageService {
    List<MyAssetResDto> getStorageList();
}
