package com.server.back.config;


import com.server.back.common.service.AuthTokenProvider;
import com.server.back.common.service.RedisService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	public static final String AUTHORIZATION_HEADER = "authorization";
	public static final String BEARER_PREFIX = "Bearer ";

	private final AuthTokenProvider tokenProvider;
	private final RedisService redisService;


	// 실제 필터링 로직은 doFilterInternal 에 들어감
	// JWT 토큰의 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		// 1. Request Header 에서 토큰을 꺼냄
		String token = resolveToken(request);

		// log.info("requestURI: {}", request.getRequestURI());

		// 2. validateToken 으로 토큰 유효성 검사
		// 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
		if (StringUtils.hasText(token)) {

			if (tokenProvider.validate(token)) {
				// 3. Redis에 해당 accessToken 로그아웃 여부 확인
				String isLogout = redisService.getData(token);
				if (ObjectUtils.isEmpty(isLogout)) {
					Authentication authentication = tokenProvider.getAuthentication(token);
					SecurityContextHolder.getContext().setAuthentication(authentication);
				} else {
					throw new JwtException("로그아웃 된 액세스 토큰으로 유효하지 않습니다.");
				}
			}

		} else {
			throw new JwtException("액세스 토큰이 존재하지 않습니다.");
		}

		filterChain.doFilter(request, response);
	}


	// Request Header 에서 토큰 정보를 꺼내오기
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.substring(7);
		}
		return null;
	}

}