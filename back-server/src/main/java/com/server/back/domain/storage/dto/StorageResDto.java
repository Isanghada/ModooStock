package com.server.back.domain.storage.dto;

import com.server.back.domain.auction.dto.AuctionResDto;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.mypage.dto.MyAssetResDto;
import com.server.back.domain.store.entity.UserAssetEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class StorageResDto {
    List<MyAssetResDto>storageList;

    public static StorageResDto fromEntityList(List<UserAssetEntity> userAssetEntityList ){
        return StorageResDto.builder()
                .storageList(userAssetEntityList.stream().map(MyAssetResDto::fromEntity).collect(Collectors.toList()))
                .build();
    }
}
