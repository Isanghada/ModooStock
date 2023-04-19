package com.server.back.domain.auction.entity;

import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.CommonEntity;
import com.server.back.domain.store.entity.UserAssetEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@Table(name="auction")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionEntity extends CommonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_asset_id",nullable = false)
    private UserAssetEntity userAsset;

    @Column(nullable = false)
    private int auctionPrice;

    @Column(nullable = false)
    private IsCompleted isCompleted;

    @Column
    private Long bidder_id;

    @Column
    private LocalDateTime bidTime;

    @Column(nullable = false)
    private IsDeleted isDeleted;

}
