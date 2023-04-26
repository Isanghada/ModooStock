package com.server.back.domain.stock.dto;

import com.server.back.domain.stock.entity.ExchangeEntity;
import com.server.back.domain.stock.entity.MaterialEntity;
import com.server.back.domain.stock.entity.StockEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StockInfoResDto {
    private List<StockListResDto> stockList;

    private List<MaterialResDto> oil;

    private List<MaterialResDto> gold;

    private List<ExchangeResDto> usd;

    private List<ExchangeResDto> jyp;

    private List<ExchangeResDto> euro;

    public static StockInfoResDto fromEntity(
            List<StockEntity> stockList, List<MaterialEntity> oil, List<MaterialEntity> gold,
            List<ExchangeEntity> usd, List<ExchangeEntity> jyp, List<ExchangeEntity> euro){
            return StockInfoResDto.builder()
                    .stockList(StockListResDto.fromEntityList(stockList))
                    .oil(MaterialResDto.fromEntityList(oil))
                    .gold(MaterialResDto.fromEntityList(gold))
                    .usd(ExchangeResDto.fromEntityList(usd))
                    .jyp(ExchangeResDto.fromEntityList(jyp))
                    .euro(ExchangeResDto.fromEntityList(euro))
                    .build();
    }


}
