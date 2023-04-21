package com.server.back.config;


import com.server.back.common.service.AuthTokenProvider;
import com.server.back.common.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


// 직접 만든 TokenProvider 와 JwtFilter 를 SecurityConfig 에 적용할 때 사용
@Slf4j
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

	private final AuthTokenProvider tokenProvider;
	private final RedisService redisService;
	private final JwtExceptionFilter jwtExceptionFilter;


	// TokenProvider 를 주입받아서 JwtFilter 를 통해 Security 로직에 필터를 등록
	@Override
	public void configure(HttpSecurity http) {
		JwtFilter customFilter = new JwtFilter(tokenProvider, redisService);
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(jwtExceptionFilter, customFilter.getClass());
	}

}