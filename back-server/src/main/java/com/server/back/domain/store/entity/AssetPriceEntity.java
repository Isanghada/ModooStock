package com.server.back.domain.store.entity;

import com.server.back.common.code.commonCode.AssetLevelType;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Table(name="asset_price")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AssetPriceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetLevelType assetLevel;

    @Column(nullable = false)
    private Integer price;

}
