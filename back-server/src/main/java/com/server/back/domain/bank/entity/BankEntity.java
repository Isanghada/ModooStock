package com.server.back.domain.bank.entity;

import com.server.back.common.code.commonCode.IsCompleted;
import com.server.back.common.entity.DealEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@DiscriminatorValue("DEAL_BANK")
@Table(name = "bank")
public class BankEntity extends DealEntity {

    @Column(nullable = false)
    private Integer interest;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private IsCompleted isCompleted = IsCompleted.N;
}
