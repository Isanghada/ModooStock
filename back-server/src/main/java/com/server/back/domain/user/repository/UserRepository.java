package com.server.back.domain.user.repository;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByIdAndIsDeleted(Long id, IsDeleted isDeleted);

    Optional<UserEntity> findByAccount(String account);

    Optional<UserEntity> findByAccountAndIsDeleted(String account, IsDeleted isDeleted);

    Optional<UserEntity> findByNickname(String nickname);

    Optional<UserEntity> findByNicknameAndIsDeleted(String nickname, IsDeleted isDeleted);

    List<UserEntity> findByAccountContainingOrNicknameContaining(String accountSearch, String nicknameSearch);

    @Query(value = "SELECT * FROM user_table WHERE id <> :excludeId ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<UserEntity> findRandomUserExcluding(@Param("excludeId") Long excludeId);

    List<UserEntity> findAllByIsDeleted(IsDeleted isDeleted);

}
