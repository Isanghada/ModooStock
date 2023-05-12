package com.server.back.domain.user.service;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.DealEntity;
import com.server.back.common.repository.DealRepository;
import com.server.back.common.service.AuthService;
import com.server.back.common.service.AuthTokenProvider;
import com.server.back.common.service.RedisService;
import com.server.back.domain.user.dto.LoginReqDto;
import com.server.back.domain.user.dto.LoginResDto;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final AuthTokenProvider authTokenProvider;
    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisService redisService;
    private final AuthService authService;

    private static final Long DAILY_MONEY = 3_000_000L; // 하루 첫 로그인 300만원 지급 받음

    /**
     *
     * @param loginReqDto 계정과 비밀번호 (account, password)
     * @param response    엑세스 토큰을 담을 response
     * @return 엑세스 토큰 및 리프레시 토큰
     * 
     */
    @Override
    @Transactional
    public LoginResDto login(LoginReqDto loginReqDto, HttpServletResponse response) {
        // 유저가 존재하지 않을 때 혹은 탈퇴한 유저 일때 error 발생
        UserEntity user = userRepository.findByAccountAndIsDeleted(loginReqDto.getAccount(), IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        log.info("[login] 비밀번호 비교 수행");
        // 비밀번호 체크
        if (!passwordEncoder.matches(loginReqDto.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        log.info("[login] 비밀번호 패스워드 일치");

        log.info("[login] 토큰 생성 및 응답");

        // 토큰 생성 및 응답
        String accessToken = authTokenProvider.createAccessToken(user.getId(), user.getNickname());
        String refreshToken = authTokenProvider.createRefreshToken(user.getId(), user.getNickname());
        authTokenProvider.setHeaderAccessToken(response, accessToken);
        authTokenProvider.setHeaderRefreshToken(response, refreshToken);

        // refresh token Redis에 저장
        redisService.setDataExpireMilliseconds("RT:" + user.getId(), refreshToken, authTokenProvider.getExpiration(refreshToken));

        // 하루 첫 로그인 인지 확인
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
        Optional<DealEntity> todayLoginUser = dealRepository.findByUserIdAndDealTypeAndCreatedAtGreaterThanEqual(user.getId(), DealType.GET_MONEY_FOR_DAILY, startDatetime);

        if (todayLoginUser.isEmpty()) {
            // 첫 로그인 이라면
            dealRepository.save(new DealEntity(user, DealType.GET_MONEY_FOR_DAILY, DAILY_MONEY));
            user.increaseCurrentMoney(DAILY_MONEY);
            userRepository.save(user);
        }

        // 토큰 body에 담아서 전달
        return LoginResDto.fromEntity(accessToken, refreshToken, user.getNickname());
    }


    /**
     * 엑세스 토큰을 재발급합니다
     *
     * @param loginRequestHeader 엑세스 토큰
     * @param response           엑세스 토큰을 담을 response
     */
    @Override
    public LoginResDto createAccessToken(Map<String, String> loginRequestHeader, HttpServletResponse response) {
        // 로그인 유저 가져오기
        String loginRequestRefreshToken = getHeader(loginRequestHeader, "x-refresh-token");

        // 1. Refresh Token 검증
        if (!authTokenProvider.validate(loginRequestRefreshToken)) {
            // Refresh Token 정보가 유효하지 않습니다.
            throw new CustomException(ErrorCode.REFRESH_TOKEN_ERROR);
        }

        // 2. Refresh Token에서 UserId와 UserNickname 가져옵니다.
        Long userId = authTokenProvider.getUserId(loginRequestRefreshToken);
        String userNickname = authTokenProvider.getUserNickname(loginRequestRefreshToken);

        // 3. Redis 에서 UserId 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String refreshToken = redisService.getData("RT:" + userId);
        if (!StringUtils.hasText(refreshToken) || !refreshToken.equals(loginRequestRefreshToken)) {
            // Refresh Token 정보가 일치하지 않습니다.
            throw new CustomException(ErrorCode.REFRESH_TOKEN_ERROR);
        }

        // 4. 새로운 토큰 생성
        String newAccessToken = authTokenProvider.createAccessToken(userId, userNickname);
        String newRefreshToken = loginRequestRefreshToken;
        if (!authTokenProvider.validate(loginRequestRefreshToken)) {
            newRefreshToken = authTokenProvider.createRefreshToken(userId, userNickname);
            // 5. RefreshToken Redis 업데이트
            redisService.setDataExpireMilliseconds("RT:" + userId, newRefreshToken, authTokenProvider.getExpiration(refreshToken));
        }
        authTokenProvider.setHeaderAccessToken(response, newAccessToken);
        authTokenProvider.setHeaderRefreshToken(response, newRefreshToken);

        // 토큰 body에 담아서 전달
        return LoginResDto.fromEntity(newAccessToken, newRefreshToken, userNickname);
    }

    /**
     * 로그아웃합니다 (엑세스 토큰 삭제)
     *
     * @param logoutRequestHeader  엑세스 토큰
     */
    @Override
    public void deleteAccessToken(Map<String, String> logoutRequestHeader) {
        // 1. Access Token 검증은 spring security에서 진행
        String accessToken = extractAccessToken(getHeader(logoutRequestHeader, "authorization"));

        // 2. 로그인 유저 에서 User id 을 가져옵니다.
        Long userId = authService.getUserId();

        // 3. Redis 에서 해당 User id 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisService.getData("RT:" + userId) != null) {
            // Refresh Token 삭제
            redisService.deleteData("RT:" + userId);
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = authTokenProvider.getExpiration(accessToken);
        redisService.setDataExpireMilliseconds(accessToken, "logout", expiration);

    }

    private String getHeader(Map<String, String> headers, String key) {
        String value = headers.get(key);
        if (!StringUtils.hasText(value)) {
            ErrorCode errorCode = key.equals("authorization") ? ErrorCode.ACCESS_TOKEN_NOT_FOUND : ErrorCode.REFRESH_TOKEN_NOT_FOUND;
            throw new CustomException(errorCode);
        }
        return value;
    }


    private String extractAccessToken(String authorizationHeader) {
        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            throw new CustomException(ErrorCode.ACCESS_TOKEN_ERROR);
        }
        return authorizationHeader.substring(7);
    }
}
