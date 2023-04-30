package com.server.back.domain.admin.service;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.service.AuthService;
import com.server.back.domain.admin.dto.AdminUserInfoResDto;
import com.server.back.domain.admin.dto.AdminUserModifyReqDto;
import com.server.back.domain.admin.dto.AdminUserResDto;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService{
    private final AuthService authService;
    private final UserRepository userRepository;

    /**
     * 모든 회원을 검색합니다.
     *
     * @return       검색된 회원들
     */
    @Override
    public List<AdminUserResDto> getUserList() {
        return AdminUserResDto.fromEntityList(userRepository.findAll());
    }

    /**
     * 닉네임, 계정으로 조건을 걸어 회원을 검색합니다.
     *
     * @param type    검색하는 조건(nick:닉네임, account:계정)
     * @param keyword 검색할 키워드
     *
     * @return       검색된 회원들
     */
    @Override
    public List<AdminUserResDto> getUserList(String type, String keyword) {
        if(type.equals("nick"))
            return AdminUserResDto.fromEntityList(userRepository.findByNicknameContaining(keyword));
        else
            return AdminUserResDto.fromEntityList(userRepository.findByAccountContaining(keyword));
    }

    /**
     * 회원의 상세 정보를 검색합니다.
     *
     * @param account    검색할 계정
     *
     * @return       계정 상세 정보
     */
    @Override
    public AdminUserInfoResDto getUserInfo(String account) {
        UserEntity user = userRepository.findByAccount(account).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        return AdminUserInfoResDto.fromEntity(user);
    }

    /**
     * 회원의 정보를 수정합니다.(닉네임만 가능)
     *
     * @param reqDto 회원 수정 정보 reqeustDto
     */
    @Override
    public void updateUser(AdminUserModifyReqDto reqDto) {
        UserEntity user = userRepository.findByIdAndIsDeleted(reqDto.getUserId(), IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 본인 닉네임을 수정 시 이미 존재하는 경우 에러 발생
        if (!reqDto.getNickname().equals(user.getNickname())
                && userRepository.findByNickname(reqDto.getNickname()).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        user.updateNicknameByAdmin(reqDto.getNickname());
        userRepository.save(user);
    }

    /**
     * 회원을 탈퇴합니다.(단, 본인은 탈퇴시킬 수 없습니다.)
     *
     * @param account 탈퇴시킬 회원 계정
     */
    @Override
    public void deleteUser(String account) {
        /* TODO
        - table 삭제: 거래, 은행, 주식거래, 보유주식, 보유 뉴스
        - isDeleted.Y: 회원에셋, 회원
         */
        Long userId = authService.getUserId();
        UserEntity user = userRepository.findByAccount(account).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getIsDeleted().equals(IsDeleted.N) || userId == user.getId())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        user.setIsDeleted(IsDeleted.Y);

        userRepository.save(user);
    }
}