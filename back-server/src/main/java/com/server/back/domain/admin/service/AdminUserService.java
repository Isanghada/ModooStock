package com.server.back.domain.admin.service;

import com.server.back.domain.admin.dto.AdminUserInfoResDto;
import com.server.back.domain.admin.dto.AdminUserModifyReqDto;
import com.server.back.domain.admin.dto.AdminUserResDto;

import java.util.List;

public interface AdminUserService {
    List<AdminUserResDto> getUserList();

    List<AdminUserResDto> getUserList(String type, String keyword);

    AdminUserInfoResDto getUserInfo(String account);

    void updateUser(AdminUserModifyReqDto reqDto);

    void deleteUser(String account);
}
