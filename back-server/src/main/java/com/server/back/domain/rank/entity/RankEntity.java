package com.server.back.domain.rank.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RankEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Integer totalMoney;

    @Column(nullable = false)
    private String profileImagePath;

}
