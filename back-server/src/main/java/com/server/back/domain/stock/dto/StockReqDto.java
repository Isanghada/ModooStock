package com.server.back.domain.stock.dto;

import com.server.back.common.code.commonCode.DealType;
import com.server.back.domain.stock.entity.DealStockEntity;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockReqDto {
    Long stockId;
    Integer price;
    Integer stockAmount;

    public DealStockEntity toEntity(UserEntity user, DealType dealType, StockEntity stock){
        return DealStockEntity.builder()
                .user(user)
                .price(price)
                .dealType(dealType)
                .stockAmount(stockAmount)
                .stock(stock)
                .build();
    }


}
