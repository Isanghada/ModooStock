package com.server.back.domain.comment.service;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.service.AuthService;
import com.server.back.domain.comment.dto.AuthorResDto;
import com.server.back.domain.comment.dto.CommentListResDto;
import com.server.back.domain.comment.dto.CommentResDto;
import com.server.back.domain.comment.entity.CommentEntity;
import com.server.back.domain.comment.repository.CommentRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    /**
     * 방명록 리스트 반환
     *
     * @param nickname
     * @return
     */
    @Override
    public List<CommentListResDto> getCommentList(String nickname) {
        UserEntity user=userRepository.findByNicknameAndIsDeleted(nickname, IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<CommentEntity> commentEntityList=commentRepository.findAllByOwnerIdAndIsDeletedOrderByCreatedAtDesc(user.getId(),IsDeleted.N);
        List<CommentListResDto> commentListRes=new ArrayList<>();

        for(CommentEntity comment:commentEntityList){
            UserEntity author=userRepository.findById(comment.getAuthorId()).orElseThrow(()->new CustomException(ErrorCode.ENTITY_NOT_FOUND));

            commentListRes.add(CommentListResDto.toDto(AuthorResDto.fromEntity(author),CommentResDto.fromEntity(comment)));
        }

        return commentListRes;
    }

    /**
     * 방명록 작성
     *
     * @param nickname
     * @param content
     */
    @Transactional
    @Override
    public void createComment(String nickname,String content) {
        Long userId=authService.getUserId();
        UserEntity author=userRepository.findByIdAndIsDeleted(userId,IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        UserEntity owner=userRepository.findByNicknameAndIsDeleted(nickname,IsDeleted.N).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        CommentEntity comment=CommentEntity.builder()
                .content(content)
                .authorId(author.getId())
                .ownerId(owner.getId())
                .isDeleted(IsDeleted.N)
                .build();

        commentRepository.save(comment);
    }

    /**
     * 방명록 수정
     *
     * @param commentId
     * @param content
     */
    @Transactional
    @Override
    public void updateComment(Long commentId, String content) {
        Long userId=authService.getUserId();
        CommentEntity comment=commentRepository.findByIdAndAndIsDeleted(commentId,IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        if(userId!=comment.getAuthorId())throw new CustomException(ErrorCode.NO_ACCESS);
        comment.update(content);
    }

    /**
     * 방명록 삭제
     *
     * @param commentId
     */
    @Transactional
    @Override
    public void deleteComment(Long commentId) {
        Long userId=authService.getUserId();
        CommentEntity comment=commentRepository.findByIdAndAndIsDeleted(commentId,IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        if(userId!=comment.getAuthorId())throw new CustomException(ErrorCode.NO_ACCESS);
        comment.update(IsDeleted.Y);
    }


}
