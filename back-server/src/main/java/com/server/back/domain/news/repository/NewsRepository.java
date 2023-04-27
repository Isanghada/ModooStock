package com.server.back.domain.news.repository;

import com.server.back.domain.news.dto.NewsResDto;
import com.server.back.domain.news.entity.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface NewsRepository extends JpaRepository<NewsEntity, Long>{
    List<NewsEntity> findAllByCompanyIdAndDateBetween(Long companyId,LocalDate startDate, LocalDate endDate);

}
