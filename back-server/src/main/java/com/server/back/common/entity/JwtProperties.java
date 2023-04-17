package com.server.back.common.entity;

public interface JwtProperties {
    String SECRET = "HongMinJeongEum";
    int AccessToken_TIME =  1000*60*10; //(1/1000초) //10분
    int RefreshToken_TIME = 1000 * 60 * 60 * 24 * 7 ;//1 week
    String HEADER_STRING = "accessToken";
}
