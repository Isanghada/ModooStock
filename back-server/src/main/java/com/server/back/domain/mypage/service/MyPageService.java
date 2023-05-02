package com.server.back.domain.mypage.service;

import com.server.back.domain.mypage.dto.HomeModifyReqDto;
import com.server.back.domain.mypage.dto.HomeResDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MyPageService {
    void updateUserAssetInMyPage(HomeModifyReqDto request);

    void createUserAssetInMyPage(Long myAssetId);

    void deleteUserAssetInMyPage(Long myAssetId);

    List<HomeResDto> geMyPageMyRoom(String nickname);

    Long getVisitorCount(String nickname,HttpServletRequest request, HttpServletResponse response);
}
