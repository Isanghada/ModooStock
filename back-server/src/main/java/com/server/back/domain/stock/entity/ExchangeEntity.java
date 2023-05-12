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
@Table(name="exchange")
public class ExchangeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String nationalCode;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Long price;
}
