package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupCreateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupDeleteRequest;
import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupUpdateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.response.ThongSoGroupResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.ThongSoGroupService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/thongsogroup")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThongSoGroupController {

    ThongSoGroupService thongSoGroupService;

    @PostMapping
    public ResponseEntity<ApiResponse<ThongSoGroupResponse>> createThongSoGroup(
            @RequestBody @Valid ThongSoGroupCreateRequest request) {
        ThongSoGroupResponse response = thongSoGroupService.createThongSoGroup(request);
        return ResponseEntity.status(201).body(ApiResponse.<ThongSoGroupResponse>builder()
                .message("Tạo nhóm thông số thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ThongSoGroupResponse>> updateThongSoGroup(
            @RequestBody @Valid ThongSoGroupUpdateRequest request) {
        ThongSoGroupResponse response = thongSoGroupService.updateThongSoGroup(request);
        return ResponseEntity.ok(ApiResponse.<ThongSoGroupResponse>builder()
                .message("Cập nhật nhóm thông số thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteThongSoGroup(@Valid @RequestParam int id) {
        thongSoGroupService.deleteThongSoGroupById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công nhóm thông số").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteThongSoGroupByList(
            @RequestBody @Valid ThongSoGroupDeleteRequest request) {
        thongSoGroupService.deleteThongSoGroupByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các nhóm thông số").build());
    }
    

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<ThongSoGroupResponse>>> getAllThongSoGroup(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<ThongSoGroupResponse> response = thongSoGroupService.getAllThongSoGroup(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<ThongSoGroupResponse>>builder()
                .message("Lấy toàn bộ nhóm thông số thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<ThongSoGroupResponse>> getThongSoGroupById(@Valid @RequestParam int id) {
        ThongSoGroupResponse response = thongSoGroupService.getThongSoGroupById(id);
        return ResponseEntity.ok(ApiResponse.<ThongSoGroupResponse>builder()
                .message("Lấy nhóm thông số theo id thành công")
                .result(response)
                .build());
    }
}
