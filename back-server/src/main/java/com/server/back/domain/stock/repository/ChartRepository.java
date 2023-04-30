package com.server.back.domain.stock.repository;

import com.server.back.domain.stock.entity.ChartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChartRepository extends JpaRepository<ChartEntity, Long> {

    List<ChartEntity> findTop360ByCompanyIdAndDateGreaterThanEqual(Long companyId, LocalDate date);
    Optional<ChartEntity> findByCompanyIdAndDate(Long companyId, LocalDate date);
    // 시작 날짜부터 360개의 주식 데이터를 얻을 수 있는 범위 확인용
    @Query(value = "SELECT distinct c.date FROM chart c WHERE c.date >= :date LIMIT :limitValue", nativeQuery = true)
    List<Date> getMarketDateByDateGreaterThanEqualAndLimit(@Param("date") LocalDate date, @Param("limitValue") Integer limitValue);
    // 뉴스 정보 구매를 위해 해당 종목의 평균가 계산
    @Query(value = "SELECT AVG(c.price_end) FROM chart c WHERE c.date >= :start AND c.date <= :end AND c.company_id = :comapny", nativeQuery = true)
    Optional<Integer> getAvgPriceEndByDateGreaterThanEqualAndDateLessThanEqualAndCompany(@Param("start") LocalDate start, @Param("end") LocalDate end, @Param("comapny") Long company_id);

    List<ChartEntity> findAllByCompanyIdAndDateBetween(Long companyId, LocalDate startDate, LocalDate date);
}
