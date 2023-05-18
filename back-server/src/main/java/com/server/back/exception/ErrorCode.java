package com.server.back.exception;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	/* 필요한 ERROR CODE 아래 처럼 작성 및 추가하기 */
	ERROR_NAME(NOT_FOUND, "에러 메세지 입니다")

	/* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */,
	DUPLICATE_RESOURCE(CONFLICT, "데이터가 이미 존재합니다"),
	MISMATCH_REQUEST(BAD_REQUEST, "데이터 간 의미가 어긋납니다 (예: 공통코드와 대응되는 데이터)"),

	/* 400 BAD REQUEST : 잘못된 요청. 입력된 데이터에 문제가 있음 */
	PASSWORD_NOT_MATCH(BAD_REQUEST, "패스워드가 일치하지 않습니다."),
	LACK_OF_MONEY(BAD_REQUEST, "잔액이 부족합니다."),
	FULL_OF_MONEY(BAD_REQUEST,"지갑이 꽉찼습니다."),
	LACK_OF_STOCK(BAD_REQUEST,"매도할 주식이 없습니다."),
	IMPOSSIBLE_FUNCTION(BAD_REQUEST, "가입 후 3시간 뒤 이용할 수 있는 기능입니다."),
	IMPOSSIBLE_TRANSFER(BAD_REQUEST, "가입 후 3시간이 지난 사용자에게 송금할 수 있습니다."),


	/* 401 UNAUTHORIZED : 권한 인증 문제. JWT 토큰과 관련된 에러 */
	UNAUTHORIZED_USER(UNAUTHORIZED, "권한이 허용되지 않은 유저입니다."),

	TOKEN_ERROR(UNAUTHORIZED, "토큰에 문제가 있습니다."),
	ACCESS_TOKEN_EXPIRED(UNAUTHORIZED, "토큰의 유효기간이 만료되었습니다."),
	ACCESS_TOKEN_NOT_FOUND(UNAUTHORIZED, "액세스 토큰이 존재하지 않습니다."),
	REFRESH_TOKEN_NOT_FOUND(UNAUTHORIZED, "리프레시 토큰이 존재하지 않습니다."),
	ACCESS_TOKEN_ERROR(UNAUTHORIZED, "액세스 토큰에 문제가 있습니다."),
	REFRESH_TOKEN_ERROR(UNAUTHORIZED, "리프레시 토큰에 문제가 있습니다."),

	/* 403 FORBIDDEN : 접근 권한 없음 */
	NO_ACCESS(FORBIDDEN, "페이지에 대한 접근 권한이 없습니다."),

	/* 404 NOT_FOUND : 대상이 존재하지 않음 */
	ENTITY_NOT_FOUND(NOT_FOUND, "대상이 존재하지 않습니다."),
	SOLD_ENTITY(NOT_FOUND, "판매 완료된 상품입니다."),
	CANCELED_ENTITY(NOT_FOUND, "판매 취소된 상품입니다."),
	USER_NOT_FOUND(NOT_FOUND, "회원이 존재하지 않습니다.");

	/* 500 INTERNAL_SERVER_ERROR : 서버 오류 - 정말 필요한 거 외엔 되도록 쓰지 않는 걸 권장*/


	private final HttpStatus httpStatus;
	private final String message;
}
