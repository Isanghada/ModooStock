package com.server.back.domain.bank.repository;

import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.domain.bank.entity.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BankRepository extends JpaRepository<BankEntity, Long> {
    Optional<BankEntity> findByIdAndAndIsCompleted(Long id, IsCompleted isCompleted);
    List<BankEntity> findByUserIdAndIsCompleted(Long userId, IsCompleted isCompleted);

    @Query("SELECT SUM(d.price) FROM BankEntity d WHERE d.user.id = :userId AND d.isCompleted = :isCompleted")
    Optional<Long> getPriceSumByUserIdAndIsCompleted(@Param("userId") Long userId, @Param("isCompleted") IsCompleted isCompleted);

}
