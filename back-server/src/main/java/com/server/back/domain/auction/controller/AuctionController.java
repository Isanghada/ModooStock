package com.server.back.domain.auction.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.auction.dto.AuctionReqDto;
import com.server.back.domain.auction.dto.AuctionResDto;
import com.server.back.domain.auction.service.AuctionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
@Api(tags="경매장 API")
public class AuctionController {

    private final AuctionService auctionService;

    @GetMapping
    @ApiOperation(value = "경매 물품 리스트를 조회합니다.")
    public ResponseEntity<ResultDto<List<AuctionResDto>>> getAuctionList(){
        List<AuctionResDto> auctionListResDto=auctionService.getAuctionList();
        return ResponseEntity.ok(ResultDto.of(auctionListResDto));
    }

    @GetMapping("/{auctionId}")
    @ApiOperation(value = "경매 물품 상세를 조회합니다.")
    public ResponseEntity<ResultDto<AuctionResDto>> getAuctionDetail(@PathVariable Long auctionId){
        AuctionResDto auctionResDto =auctionService.getAuctionDetail(auctionId);
        return ResponseEntity.ok(ResultDto.of(auctionResDto));
    }

    @PostMapping
    @ApiOperation(value = "경매에 물품을 등록합니다.")
    public ResponseEntity<ResultDto<Boolean>> createAuction(@RequestBody AuctionReqDto auctionReqDto){
        auctionService.createAuction(auctionReqDto);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @PostMapping ("/{auctionId}")
    @ApiOperation(value = "경매에 참여합니다.")
    public ResponseEntity<ResultDto<Boolean>> participateAuction(@PathVariable Long auctionId){
        auctionService.participateAuction(auctionId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

    @DeleteMapping ("/{auctionId}")
    @ApiOperation(value = "경매를 취소합니다.")
    public ResponseEntity<ResultDto<Boolean>> deleteAuction(@PathVariable Long auctionId){
        auctionService.deleteAuction(auctionId);
        return ResponseEntity.ok().body(ResultDto.ofSuccess());
    }

}
