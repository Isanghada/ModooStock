package com.server.back.common.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.server.back.domain.user.service.CustomUserDetailsService;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
public class AuthTokenProvider {

	@Value("${jwt.secret}")
	private final String secretKey;

	private final CustomUserDetailsService customUserDetailsService;
	private final ObjectMapper objectMapper;
	@Value("${jwt.expire.access}")
	private Long accessExpiry; // 토큰 만료일
	@Value("${jwt.expire.refresh}")
	private Long refreshExpiry; // 토큰 만료일


	@Autowired
	public AuthTokenProvider(@Value("${jwt.secret}") String secretKey, CustomUserDetailsService customUserDetailsService) {
		this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
		objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
		this.customUserDetailsService = customUserDetailsService;
	}


	/**
	 * 토큰 생성
	 */
	private String createToken(Long userId, String nickname, TokenType tokenType) {
		// 토큰에 넣을 정보를 string으로 생성
		Map<String, String> tokenInfo = new HashMap<>();
		tokenInfo.put("userId", String.valueOf(userId));
		tokenInfo.put("nickname", nickname);
		tokenInfo.put("tokenType", tokenType.name());
		String tokenInfoStr;
		try {
			tokenInfoStr = objectMapper.writeValueAsString(tokenInfo);
		} catch (JsonProcessingException e) {
			log.error("토큰에 넣을 정보를 json으로 변환하는 것을 실패하였습니다");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		}

		// 토큰 발행일, 만료일 설정
		Date issuedDate = new Date();
		Long expiryTime = tokenType.equals(TokenType.ACCESS) ? accessExpiry : refreshExpiry;
		Date expiryDate = new Date(issuedDate.getTime() + expiryTime);

		return Jwts.builder()
			.setSubject(tokenInfoStr)
			.setIssuedAt(issuedDate)
			.setExpiration(expiryDate)
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
	}


	/**
	 * accessToken 생성
	 */
	public String createAccessToken(Long userId, String nickname) {
		return createToken(userId, nickname, TokenType.ACCESS);
	}


	/**
	 * refreshToken 생성
	 */
	public String createRefreshToken(Long userId, String nickname) {
		return createToken(userId, nickname, TokenType.REFRESH);
	}


	/**
	 * 토큰에 저장된 Subject(유저 정보)를 조회
	 */
	private String getSubject(String token) {
		try {
			return Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody() // token의 Body가 하기 exception들로 인해 유효하지 않으면 각각에 해당하는 로그 콘솔에 찍음
				.getSubject();
		} catch (SecurityException e) {
			log.error("Invalid JWT signature.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token.");
			// 처음 로그인(/auth/kakao, /auth/google) 시, AccessToken(AppToken) 없이 접근해도 token validate을 체크하기 때문에 exception 터트리지 않고 catch합니다.
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		} catch (ExpiredJwtException e) {
			log.error("Expired JWT token.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		} catch (UnsupportedJwtException e) {
			log.error("Unsupported JWT token.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		} catch (IllegalArgumentException e) {
			log.error("JWT token compact of handler are invalid.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		}
	}


	/**
	 * 토큰에서 유저 아이디(PK) 추출
	 */
	public Long getUserId(String token) {
		String subject = getSubject(token);
		try {
			Map<String, String> tokenInfo = objectMapper.readValue(subject, Map.class);
			return Long.valueOf(tokenInfo.get("userId"));
		} catch (JsonProcessingException e) {
			log.error("JWT token을 Map으로 변환하는 것을 실패했습니다.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		}
	}


	/**
	 * 토큰에서 유저 닉네임 추출
	 */
	public String getUserNickname(String token) {
		String subject = getSubject(token);
		try {
			Map<String, String> tokenInfo = objectMapper.readValue(subject, Map.class);
			return tokenInfo.get("nickname");
		} catch (JsonProcessingException e) {
			log.error("JWT token을 Map으로 변환하는 것을 실패했습니다.");
			throw new CustomException(ErrorCode.TOKEN_ERROR);
		}
	}


	/**
	 * 토큰의 유효성 및 만료기간 검사
	 */
	public boolean validate(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}


	/**
	 * 사용자가 DB에 저장되어있는 유효한 사용자인지 인증 후,
	 * SecurityContextHolder에 저장할 Authentication 객체 생성.
	 */
	public UsernamePasswordAuthenticationToken getAuthentication(String token) {
		UserDetails userDetails = customUserDetailsService.loadUserByUsername(this.getUserId(token).toString());
		log.info("getAuthentication: {}, token: {}", userDetails.getUsername(), token);
		return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
	}


	/**
	 * 엑세스 토큰 헤더 설정
	 */
	public void setHeaderAccessToken(HttpServletResponse response, String accessToken) {
		response.setHeader("authorization", accessToken);
	}


	/**
	 * 리프레시 토큰 헤더 설정
	 */
	public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken) {
		response.setHeader("x-refresh-token", refreshToken);
	}


	/**
	 * JWT 토큰의 만료시간
	 */
	public Long getExpiration(String accessToken) {

		Date expiration = Jwts.parser().setSigningKey(secretKey)
			.parseClaimsJws(accessToken).getBody().getExpiration();

		long now = new Date().getTime();
		return expiration.getTime() - now;
	}


	private enum TokenType {
		ACCESS, REFRESH
	}

}