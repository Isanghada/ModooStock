package com.server.back.domain.stock.entity;

import com.server.back.domain.stock.dto.StockReqDto;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private Float rate;

    public UserDealEntity(UserEntity user, StockReqDto stockReqDto , StockEntity stock, Integer chartPrice){
        this.user = user;
        this.totalAmount = stockReqDto.getStockAmount();
        this.average = (float) chartPrice;
        this.totalPrice = (float) stockReqDto.getStockAmount() * chartPrice;
        this.stock = stock;
        this.rate = (chartPrice - average) / (float) average;
    }

    // 매수
    public void increase(Integer amount , Integer chartPrice){
        this.totalPrice += (chartPrice * amount);
        this.totalAmount = this.totalAmount + amount;
        this.average = this.totalPrice / this.totalAmount;
        this.rate = (chartPrice - average) / (float) average;
    }

    // 매도
    public void decrease(Integer amount, Integer chartPrice){
        this.totalPrice -= (this.average * amount);
        this.totalAmount -= amount;
        if(totalAmount <= 0){
            this.average =  (float) 0;
            this.rate = (float) 0;
        }
        else {
            this.rate = (chartPrice - average) / (float) average;
        }
    }

    // 수익률 변경
    public void calRate(Integer chartPrice){
        if(totalAmount > 0){
            this.rate = (chartPrice - average) / (float) average;
        }
    }
}
