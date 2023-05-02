package com.server.back.domain.comment.entity;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "comment")
public class CommentEntity extends CommonEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long authorId;

    @Column(nullable=false)
    private Long ownerId;

    @Column(nullable = false)
    private IsDeleted isDeleted;

    public void update(String content){
        this.content=content;
    }

    public void update(IsDeleted isDeleted){
        this.isDeleted=isDeleted;
    }
}
