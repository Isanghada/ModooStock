package com.server.back.domain.mypage.dto;

import com.server.back.common.code.commonCode.AssetColorType;
import com.server.back.common.code.commonCode.AssetLevelType;
import com.server.back.domain.store.entity.UserAssetLocation;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class HomeResDto {
    private Long userAssetId;
    private String assetName;
    private String assetNameKor;
    private AssetLevelType assetLevel;
    private float pos_x;
    private float pos_y;
    private float pos_z;
    private float rot_x;
    private float rot_y;
    private float rot_z;

    private AssetColorType type;

    public static HomeResDto fromEntity(UserAssetLocation userAssetLocation){

        AssetColorType type = userAssetLocation.getAsset().getId() > 370 ? AssetColorType.Material : AssetColorType.LP_Rooms;

        return HomeResDto.builder()
                .assetName(userAssetLocation.getAsset().getAssetName())
                .assetNameKor(userAssetLocation.getAsset().getAssetNameKor())
                .assetLevel(userAssetLocation.getAsset().getAssetLevel())
                .userAssetId(userAssetLocation.getId())
                .pos_x(userAssetLocation.getPosX())
                .pos_y(userAssetLocation.getPosY())
                .pos_z(userAssetLocation.getPosZ())
                .rot_x(userAssetLocation.getRotX())
                .rot_y(userAssetLocation.getRotY())
                .rot_z(userAssetLocation.getRotZ())
                .type(type)
                .build();
    }

    public static List<HomeResDto> fromEntityList(List<UserAssetLocation> userAssetLocationList){
        return userAssetLocationList.stream().map(HomeResDto::fromEntity).collect(Collectors.toList());
    }
}
