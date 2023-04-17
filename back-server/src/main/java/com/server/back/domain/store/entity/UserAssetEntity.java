package com.server.back.domain.store.entity;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.domain.user.entity.UserEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="user_asset")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name="asset_id",nullable = false)
    private AssetEntity asset;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsDeleted isDeleted;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsInRespository isInRepository;


}
