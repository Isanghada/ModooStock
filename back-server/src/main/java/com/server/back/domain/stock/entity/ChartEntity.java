package com.server.back.domain.stock.entity;


import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Table(name = "chart")
public class ChartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long priceBefore;

    @Column(nullable = false)
    private Long priceEnd;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;

    @Column(nullable = false)
    private Long buy;

    @Column(nullable = false)
    private Long sell;

    @Column(nullable = false)
    private Float changeRate;

    public void buy(Integer amount){
        this.buy += amount;
        this.changeRate = (float) (1+((buy-sell)/100)*0.001);
    }

    public void sell(Integer amount){
        this.sell += amount;
        this.changeRate = (float) (1+((buy-sell)/100)*0.001);
    }
}
