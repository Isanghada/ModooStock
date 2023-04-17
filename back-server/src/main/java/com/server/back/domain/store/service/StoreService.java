package com.server.back.domain.store.service;

import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.dto.AssetResDto;

public interface StoreService {
    AssetResDto createGotcha(String assetLevel);
}
