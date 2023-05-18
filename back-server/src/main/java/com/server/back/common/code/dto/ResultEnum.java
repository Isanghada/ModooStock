package com.server.back.common.code.dto;

public enum ResultEnum {
    SUCCESS("SUCCESS"),
    FAIL("FAIL");

    private final String msg;


    ResultEnum(String msg) {
        this.msg = msg;
    }


    @Override
    public String toString() {
        return this.msg;
    }
}
