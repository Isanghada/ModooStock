package com.server.back.domain.mypage.dto;

import com.server.back.domain.store.entity.UserAssetLocation;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class HomeResDto {
    private Long userAssetId;
    private String assetImagePath;
    private float pos_x;
    private float pos_y;
    private float pos_z;
    private float rot_x;
    private float rot_y;
    private float rot_z;

    public static HomeResDto fromEntity(UserAssetLocation userAssetLocation){
        return HomeResDto.builder()
                .assetImagePath(userAssetLocation.getAsset().getAssetImagePath())
                .userAssetId(userAssetLocation.getId())
                .pos_x(userAssetLocation.getPosX())
                .pos_y(userAssetLocation.getPosY())
                .pos_z(userAssetLocation.getPosZ())
                .rot_x(userAssetLocation.getRotX())
                .rot_y(userAssetLocation.getRotY())
                .rot_z(userAssetLocation.getRotZ())
                .build();
    }

    public static List<HomeResDto> fromEntityList(List<UserAssetLocation> userAssetLocationList){
        return userAssetLocationList.stream().map(HomeResDto::fromEntity).collect(Collectors.toList());
    }
}
