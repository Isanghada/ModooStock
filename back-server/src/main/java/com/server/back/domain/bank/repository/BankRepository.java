package com.server.back.domain.bank.repository;

import com.server.back.domain.bank.entity.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<BankEntity, Long> {
}
