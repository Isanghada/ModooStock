package com.server.back.domain.store.entity;

import com.server.back.common.code.commonCode.AssetLevelType;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="asset")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetLevelType assetLevel;

    @Column(nullable = false,unique = true)
    private String assetName;

    @Column(nullable = false)
    private String assetNameKor;

}
