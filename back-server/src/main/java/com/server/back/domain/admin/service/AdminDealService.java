package com.server.back.domain.admin.service;

import com.server.back.domain.admin.dto.AdminDealResDto;

import java.util.List;

public interface AdminDealService {
    List<AdminDealResDto> getDealList();

    List<AdminDealResDto> getDealList(String account);
}
