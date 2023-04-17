package com.server.back.domain.user.repository;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByIdAndIsDeleted(long id, IsDeleted isDeleted);
}
