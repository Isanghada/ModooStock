package com.server.back.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 관리자 회원 정보 수정
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserModifyReqDto {
    private Long userId;
    private String nickname;
}
