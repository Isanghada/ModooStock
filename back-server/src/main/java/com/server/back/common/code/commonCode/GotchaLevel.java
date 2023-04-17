package com.server.back.common.code.commonCode;

import lombok.Getter;

@Getter
public enum GotchaLevel implements TypeModel{
    LOW("낮은 단계 갓차"),
    MIDDLE("증간 단계 갓차"),
    HIGH("높은 단계 갓차");

    private final String description;

    GotchaLevel(String description) {
        this.description = description;
    }

    public static GotchaLevel of(String gotchaStr){
        for(GotchaLevel gotcha:GotchaLevel.values()){
            if(gotcha.getName().equals(gotchaStr)){
                return gotcha;
            }
        }
        throw new IllegalArgumentException("일치하는 GOTCHA LEVEL이 없습니다.");
    }
    @Override
    public String getName() {
        return name();
    }
}
