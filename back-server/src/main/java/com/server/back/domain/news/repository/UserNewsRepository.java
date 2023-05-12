package com.server.back.domain.news.repository;

import com.server.back.domain.news.entity.UserNewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserNewsRepository extends JpaRepository<UserNewsEntity, Long> {

    Optional<UserNewsEntity> findByNewsId(Long id);
    List<UserNewsEntity> findAllByUserIdOrderByNews_DateDesc(Long userId);
    void deleteAllByUserId(Long userId);
}
