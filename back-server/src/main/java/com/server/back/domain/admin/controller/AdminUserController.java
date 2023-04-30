package com.server.back.domain.admin.controller;

import com.server.back.common.code.dto.ResultDto;
import com.server.back.domain.admin.dto.AdminUserInfoResDto;
import com.server.back.domain.admin.dto.AdminUserModifyReqDto;
import com.server.back.domain.admin.dto.AdminUserResDto;
import com.server.back.domain.admin.service.AdminUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/user")
@RequiredArgsConstructor
@Api(tags="관리자 유저 API")
public class AdminUserController {
    private final AdminUserService adminUserService;
    @GetMapping
    @ApiOperation(value = "전체 회원 목록을 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminUserResDto>>> getUserList(){
        List<AdminUserResDto> userList= adminUserService.getUserList();
        return ResponseEntity.ok(ResultDto.of(userList));
    }
    @GetMapping("/nick/{nickname}")
    @ApiOperation(value = "nickname으로 검색한 회원 목록을 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminUserResDto>>> getNicknameUserList(@PathVariable(name = "nickname")String nickname){
        List<AdminUserResDto> userList= adminUserService.getUserList("nick", nickname);
        return ResponseEntity.ok(ResultDto.of(userList));
    }
    @GetMapping("/account/{account}")
    @ApiOperation(value = "account으로 검색한 회원 목록을 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<List<AdminUserResDto>>> getAccountUserList(@PathVariable(name = "account")String account){
        List<AdminUserResDto> userList = adminUserService.getUserList("account", account);
        return ResponseEntity.ok(ResultDto.of(userList));
    }
    @GetMapping("/{account}")
    @ApiOperation(value = "회원 상세 정보를 반환합니다.", notes = "")
    public ResponseEntity<ResultDto<AdminUserInfoResDto>> getUserInfo(@PathVariable(name="account")String account){
        AdminUserInfoResDto adminUserInfoResDto = adminUserService.getUserInfo(account);
        return ResponseEntity.ok(ResultDto.of(adminUserInfoResDto));
    }
    @PutMapping
    @ApiOperation(value = "회원 정보를 수정합니다.", notes = "")
    public ResponseEntity<ResultDto<Boolean>> updateUserInfo(@RequestBody AdminUserModifyReqDto reqDto){
        adminUserService.updateUser(reqDto);
        return ResponseEntity.ok(ResultDto.ofSuccess());
    }
    @DeleteMapping("/{account}")
    @ApiOperation(value = "회원을 탈퇴시킵니다", notes = "")
    public ResponseEntity<ResultDto<Boolean>> deleteUserInfo(@PathVariable("account")String account){
        adminUserService.deleteUser(account);
        return ResponseEntity.ok(ResultDto.ofSuccess());
    }
}
