package com.server.back.domain.mypage.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class HomeModifyReqDto {

    private Long userAssetId;
    private float pos_x;
    private float pos_y;
    private float pos_z;
    private float rot_x;
    private float rot_y;
    private float rot_z;

}
