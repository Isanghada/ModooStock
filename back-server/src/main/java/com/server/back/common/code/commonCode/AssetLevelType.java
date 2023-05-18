package com.server.back.common.code.commonCode;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum AssetLevelType implements TypeModel{
    RARE("낮은 단계"),
    EPIC("증간 단계"),
    UNIQUE("높은 단계"),
    LEGENDARY("가장 높은 단계");

    private final String description;

    AssetLevelType(String description) {
        this.description = description;
    }

    public static AssetLevelType of(String assetLevelStr){
        for(AssetLevelType assetlevel:AssetLevelType.values()){
            if(assetlevel.getName().equals(assetLevelStr)){
                return assetlevel;
            }
        }
        throw new IllegalArgumentException("일치하는 ASSET LEVEL이 없습니다.");
    }
    @Override
    public String getName() {
        return name();
    }
}
