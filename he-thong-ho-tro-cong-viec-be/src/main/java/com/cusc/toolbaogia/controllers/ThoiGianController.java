package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianCreateRequest;
import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianDeleteRequest;
import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianUpdateRequest;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.ThoiGianService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/thoigian")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThoiGianController {

    ThoiGianService thoiGianService;

    @PostMapping
    public ResponseEntity<ApiResponse<ThoiGianResponse>> createThoiGian(
            @RequestBody @Valid ThoiGianCreateRequest request) {
        ThoiGianResponse response = thoiGianService.createThoiGian(request);
        return ResponseEntity.status(201).body(ApiResponse.<ThoiGianResponse>builder()
                .message("Tạo thời gian thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ThoiGianResponse>> updateThoiGian(
            @RequestBody @Valid ThoiGianUpdateRequest request) {
        ThoiGianResponse response = thoiGianService.updateThoiGian(request);
        return ResponseEntity.ok(ApiResponse.<ThoiGianResponse>builder()
                .message("Cập nhật thời gian thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteThoiGian(@Valid @RequestParam int id) {
        thoiGianService.deleteThoiGianById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thành công thời gian")
                .build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteThoiGianByList(@Valid @RequestBody ThoiGianDeleteRequest request) {
        thoiGianService.deleteThoiGianByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thành công các thời gian")
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<ThoiGianResponse>>> getAllThoiGian(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<ThoiGianResponse> response = thoiGianService.getAllThoiGian(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<ThoiGianResponse>>builder()
                .message("Lấy toàn bộ thời gian thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<ThoiGianResponse>> getThoiGianById(@Valid @RequestParam int id) {
        ThoiGianResponse response = thoiGianService.getThoiGianById(id);
        return ResponseEntity.ok(ApiResponse.<ThoiGianResponse>builder()
                .message("Lấy thời gian theo id thành công")
                .result(response)
                .build());
    }
}
