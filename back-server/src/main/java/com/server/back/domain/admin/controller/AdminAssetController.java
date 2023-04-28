package com.server.back.domain.admin.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/asset")
@RequiredArgsConstructor
@Api(tags="관리자 에셋 API")
public class AdminAssetController {
}
