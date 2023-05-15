package com.server.back.domain.admin.service;

import com.server.back.common.code.commonCode.*;
import com.server.back.common.service.AuthService;
import com.server.back.domain.admin.dto.AdminUserInfoResDto;
import com.server.back.domain.admin.dto.AdminUserModifyReqDto;
import com.server.back.domain.admin.dto.AdminUserResDto;
import com.server.back.domain.auction.entity.AuctionEntity;
import com.server.back.domain.auction.repository.AuctionRepository;
import com.server.back.domain.bank.entity.BankEntity;
import com.server.back.domain.bank.repository.BankRepository;
import com.server.back.domain.news.repository.UserNewsRepository;
import com.server.back.domain.stock.entity.ChartEntity;
import com.server.back.domain.stock.entity.DealStockEntity;
import com.server.back.domain.stock.entity.StockEntity;
import com.server.back.domain.stock.entity.UserDealEntity;
import com.server.back.domain.stock.repository.ChartRepository;
import com.server.back.domain.stock.repository.DealStockRepository;
import com.server.back.domain.stock.repository.StockRepository;
import com.server.back.domain.stock.repository.UserDealRepository;
import com.server.back.domain.store.entity.UserAssetEntity;
import com.server.back.domain.store.repository.UserAssetRepository;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.exception.CustomException;
import com.server.back.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.sql.rowset.CachedRowSet;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService{
    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserAssetRepository userAssetRepository;
    private final UserNewsRepository userNewsRepository;
    private final UserDealRepository userDealRepository;
    private final BankRepository bankRepository;
    private final AuctionRepository auctionRepository;
    private final StockRepository stockRepository;
    private final ChartRepository chartRepository;
    private final DealStockRepository dealStockRepository;


    /**
     * 모든 회원을 검색합니다.
     *
     * @return       검색된 회원들
     */
    @Override
    public List<AdminUserResDto> getUserList() {
        return AdminUserResDto.fromEntityList(userRepository.findAll());
    }

    /**
     * 닉네임, 계정으로 조건을 걸어 회원을 검색합니다.
     *
     * @param type    검색하는 조건(nick:닉네임, account:계정)
     * @param keyword 검색할 키워드
     *
     * @return       검색된 회원들
     */
    @Override
    public List<AdminUserResDto> getUserList(String type, String keyword) {
        if(type.equals("nick"))
            return AdminUserResDto.fromEntityList(userRepository.findByNicknameContaining(keyword));
        else
            return AdminUserResDto.fromEntityList(userRepository.findByAccountContaining(keyword));
    }

    /**
     * 회원의 상세 정보를 검색합니다.
     *
     * @param account    검색할 계정
     *
     * @return       계정 상세 정보
     */
    @Override
    public AdminUserInfoResDto getUserInfo(String account) {
        UserEntity user = userRepository.findByAccountAndIsDeleted(account, IsDeleted.N).orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        return AdminUserInfoResDto.fromEntity(user);
    }

    /**
     * 회원의 정보를 수정합니다.(닉네임만 가능)
     *
     * @param reqDto 회원 수정 정보 reqeustDto
     */
    @Override
    public void updateUser(AdminUserModifyReqDto reqDto) {
        UserEntity user = userRepository.findByIdAndIsDeleted(reqDto.getUserId(), IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 본인 닉네임을 수정 시 이미 존재하는 경우 에러 발생
        if (!reqDto.getNickname().equals(user.getNickname())
                && userRepository.findByNicknameAndIsDeleted(reqDto.getNickname(), IsDeleted.N).isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        user.updateNicknameByAdmin(reqDto.getNickname());
        userRepository.save(user);
    }

    /**
     * 회원을 탈퇴합니다.(단, 본인은 탈퇴시킬 수 없습니다.)
     *
     * @param account 탈퇴시킬 회원 계정
     */
    @Override
    public void deleteUser(String account) {
        /* TODO
        - table 삭제: 거래, 은행, 주식거래, 보유주식, 보유 뉴스
        - isDeleted.Y: 회원에셋, 회원
         */
        Long userId = authService.getUserId();
        UserEntity user = userRepository.findByAccountAndIsDeleted(account, IsDeleted.N).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(userId == user.getId())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        // 회원 에셋 모두 가져오기
        List<UserAssetEntity> userAssetList = userAssetRepository.findByUserAndIsDeleted(user, IsDeleted.N);

        // 회원 에셋 모두 삭제
        for (UserAssetEntity userAsset : userAssetList) {

            // 회원 경매 모두 삭제
            if (userAsset.getIsAuctioned().equals(IsAuctioned.Y)) {
                Optional<AuctionEntity> auctionAsset = auctionRepository.findById(userAsset.getId());
                if (auctionAsset.isPresent()) {
                    auctionAsset.get().update(IsDeleted.Y);
                    auctionRepository.save(auctionAsset.get());
                }
                userAsset.update(IsAuctioned.N);
            }
            userAsset.update();
        }

        // 회원 보유 뉴스 모두 삭제
        userNewsRepository.deleteAllByUserId(userId);

        // 회원의 보유 주식 모두 팔기
        List<StockEntity> stockList = stockRepository.findTop4ByOrderByIdDesc();

        for (StockEntity stock : stockList) {
            Optional<UserDealEntity> optionalUserDeal = userDealRepository.findByUserIdAndStockId(userId, stock.getId());
            if (optionalUserDeal.isPresent() && optionalUserDeal.get().getTotalAmount() > 0) {

                UserDealEntity userDeal = optionalUserDeal.get();

                // 종가 가져오기
                // 원본 종가
                ChartEntity chart = chartRepository.findByCompanyIdAndDate(stock.getCompany().getId(), stock.getMarket().getGameDate())
                        .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
                Long chartPrice = chart.getPriceEnd();

                // 변화율 * 종가
                Optional<ChartEntity> change = chartRepository.findById(chart.getId()-1);
                if(change.isPresent() && change.get().getChangeRate() != 0){
                    chartPrice = (long) (chartPrice * change.get().getChangeRate());
                }

                // 매도
                // 1. 주식 판 만큼 돈 더하기
                user.increaseCurrentMoney(chartPrice * userDeal.getTotalAmount());
                userRepository.save(user);

                chart.sell(userDeal.getTotalAmount());
                chartRepository.save(chart);

                DealStockEntity dealStock = DealStockEntity.builder()
                        .user(user)
                        .price( chartPrice * userDeal.getTotalAmount())
                        .dealType(DealType.GET_MONEY_FOR_STOCK)
                        .stockAmount(userDeal.getTotalAmount())
                        .stock(stock)
                        .build();

                // 2. 거래내역 남기기
                dealStockRepository.save(dealStock);

                // 3. user_deal 수정
                userDeal.decrease(userDeal.getTotalAmount(), chartPrice);
                userDealRepository.save(userDeal);
            }
        }

        // 은행 예금 삭제 (모두 완료로)
        List<BankEntity> userBankList = bankRepository.findByUserIdAndIsCompleted(userId, IsCompleted.N);

        for ( BankEntity userBank : userBankList ) {
            userBank.setIsCompleted(IsCompleted.Y);
        }

        // 회원 삭제
        user.setIsDeleted(IsDeleted.Y);

        userRepository.save(user);
    }

    /**
     * 어드민 여부를 체크 합니다.
     *
     */
    @Override
    public void getUserIsAdmin() {
        Long userId = authService.getUserId();
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!user.getRole().equals(Role.ADMIN)) throw new CustomException(ErrorCode.NO_ACCESS);
    }
}