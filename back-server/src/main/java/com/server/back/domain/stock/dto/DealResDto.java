package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.UserDealEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DealResDto {
    String dealType;
    Long price;
    Integer amount;
    String kind;


    public static DealResDto fromEntity(String dealType, Long price, Integer amount, String kind){
        return DealResDto.builder()
                .dealType(dealType)
                .price(price)
                .amount(amount)
                .kind(kind)
                .build();

    }

}
