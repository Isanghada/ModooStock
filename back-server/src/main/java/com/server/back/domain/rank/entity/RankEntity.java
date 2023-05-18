package com.server.back.domain.rank.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name="rank_table")
public class RankEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Long totalMoney;

    @Column(nullable = false)
    private String profileImagePath;

    public void update(Long money){
        this.totalMoney+=money;
    }

}
