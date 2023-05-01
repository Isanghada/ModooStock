package com.server.back.domain.admin.service;

import com.server.back.domain.admin.dto.AdminMarketResDto;
import com.server.back.domain.admin.dto.AdminStockResDto;

import java.util.List;

public interface AdminMarketService {
    List<AdminMarketResDto> getMarketList();

    List<AdminStockResDto> getMarketStockList(Long marketId);
}
