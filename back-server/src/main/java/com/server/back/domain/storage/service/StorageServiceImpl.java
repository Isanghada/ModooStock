package com.server.back.domain.storage.service;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.common.service.AuthService;
import com.server.back.domain.storage.dto.StorageResDto;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.repository.UserAssetRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserAssetRepository userAssetRepository;

    @Override
    public StorageResDto getStorageList() {
        Long userId=authService.getUserId();
        UserEntity user=userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<UserAssetEntity> userAssetEntityList=userAssetRepository.findByUserAndIsInRepositoryAndIsDeleted(user, IsInRespository.Y, IsDeleted.N);
        return StorageResDto.fromEntityList(userAssetEntityList);
    }
}
