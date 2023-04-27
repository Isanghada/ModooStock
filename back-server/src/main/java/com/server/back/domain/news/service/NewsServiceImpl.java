package com.server.back.domain.news.service;

import com.server.back.common.service.AuthService;
import com.server.back.domain.news.dto.NewsReqDto;
import com.server.back.domain.news.dto.NewsResDto;
import com.server.back.domain.news.dto.StockNewsListResDto;
import com.server.back.domain.news.entity.NewsEntity;
import com.server.back.domain.news.entity.UserNewsEntity;
import com.server.back.domain.news.repository.NewsRepository;
import com.server.back.domain.news.repository.UserNewsRepository;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.stock.repository.ChartRepository;
import com.server.back.domain.stock.repository.StockRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;
    private final StockRepository stockRepository;
    private final ChartRepository chartRepository;
    private final UserNewsRepository userNewsRepository;
    private final AuthService authService;
    private final UserService userService;

    @Override
    public NewsResDto buyNews(NewsReqDto newsReqDto) {

        Long userId = authService.getUserId();
        UserEntity user = userService.getUserById(userId);
        StockEntity stock = stockRepository.findById(newsReqDto.getStockId()).get();

        // 산 만큼 돈 빼내기
        user.decreaseCurrentMoney(newsReqDto.getPrice());

        // 해당 월, 종목 기사 하나 랜덤 가져오기.
        int year = newsReqDto.getDate().getYear();
        int month = newsReqDto.getDate().getMonthValue();
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        List<NewsEntity> news = newsRepository.findAllByCompanyIdAndDateBetween(stock.getCompany().getId(),startDate,endDate);
        int randomIndex = new Random().nextInt(news.size());
        NewsEntity selectNews = news.get(randomIndex);

        // 유저가 보유한 뉴스 목록에 추가
        Optional<UserNewsEntity> userNews = userNewsRepository.findByNewsId(selectNews.getId());
        if(!userNews.isPresent()){
            userNewsRepository.save(newsReqDto.toEntity(user, selectNews));
        }
        return NewsResDto.fromEntity(selectNews);
    }

    @Override
    public StockNewsListResDto getStockList() {
        // 종목 List 정보
        List<StockEntity> stockList = stockRepository.findTop4ByOrderByIdDesc();
        LocalDate date= stockList.get(0).getMarket().getStartAt();
        Long companyId = stockList.get(0).getCompany().getId();

        // 차트(날짜) 정보
        List<ChartEntity> stockChartList = chartRepository.findTop360ByCompanyIdAndDateGreaterThanEqual(companyId, date);

        return StockNewsListResDto.fromEntity(stockList, stockChartList);
    }

    @Override
    public List<NewsResDto> getNewsList() {
        Long userId = authService.getUserId();
        List<UserNewsEntity> userNews = userNewsRepository.findAllByUserId(userId);
        return NewsResDto.fromEntityList(userNews);
    }
}
