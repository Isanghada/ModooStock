package com.server.back.domain.stock.entity;

import com.server.back.common.entity.DealEntity;
import com.server.back.domain.user.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Table(name = "deal_stock")
public class DealStockEntity extends DealEntity {
    @Column(nullable=false)
    private Integer stockAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private StockEntity stock;
}
