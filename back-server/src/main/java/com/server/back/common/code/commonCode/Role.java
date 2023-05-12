package com.server.back.common.code.commonCode;

import lombok.Getter;

@Getter
public enum Role implements TypeModel {
    USER("ROLE_USER"),
    ADMIN("ROLE_USER,ROLE_ADMIN");

    @Override
    public String getName() {
        return name();
    }

    private final String description;

    Role(String description) {
        this.description = description;
    }
}