package com.server.back.domain.stock.entity;

import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Table(name = "user_deal")
public class UserDealEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private Integer totalAmount;

    @Column(nullable = false)
    private Float average;

    @Column(nullable = false)
    private Float totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private StockEntity stock;

    public UserDealEntity(UserEntity user, StockReqDto stockReqDto , StockEntity stock){
        this.user = user;
        this.totalAmount = stockReqDto.getStockAmount();
        this.average = (float)stockReqDto.getPrice();
        this.totalPrice = (float) stockReqDto.getStockAmount() * stockReqDto.getPrice();
        this.stock = stock;
    }

    // 매수
    public void increase(Long price, Integer amount){
        this.totalPrice += (price * amount);
        this.totalAmount = this.totalAmount + amount;
        this.average = this.totalPrice / this.totalAmount;
    }

    // 매도
    public void decrease(Integer amount){
        this.totalPrice -= (this.average * amount);
        this.totalAmount -= amount;
        if(totalAmount <= 0){
            this.average =  (float) 0;
        }
    }
}
