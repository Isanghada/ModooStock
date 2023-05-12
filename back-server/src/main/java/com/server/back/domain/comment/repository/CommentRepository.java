package com.server.back.domain.comment.repository;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.comment.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    Optional<CommentEntity>findByIdAndAndIsDeleted(Long id,IsDeleted isDeleted);
    List<CommentEntity> findAllByOwnerIdAndIsDeletedOrderByCreatedAtDesc(Long ownerId, IsDeleted isDeleted);
}
