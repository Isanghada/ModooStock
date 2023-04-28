package com.server.back.domain.admin.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/deal")
@RequiredArgsConstructor
@Api(tags="관리자 거래내역 API")
public class AdminDealController {
}
