package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaDeleteRequest;
import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.goibaogia.response.GoiBaoGiaResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.GoiBaoGiaService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/goibaogia")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GoiBaoGiaController {

    GoiBaoGiaService goiBaoGiaService;

    @PostMapping
    public ResponseEntity<ApiResponse<GoiBaoGiaResponse>> createGoiSanPham(
            @RequestBody @Valid GoiBaoGiaCreateRequest request) {
        GoiBaoGiaResponse response = goiBaoGiaService.createGoiBaoGia(request);
        return ResponseEntity.status(201).body(ApiResponse.<GoiBaoGiaResponse>builder()
                .message("Tạo gói báo giá thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<GoiBaoGiaResponse>> updateGoiSanPham(
            @RequestBody @Valid GoiBaoGiaUpdateRequest request) {
        GoiBaoGiaResponse response = goiBaoGiaService.updateGoiBaoGia(request);
        return ResponseEntity.ok(ApiResponse.<GoiBaoGiaResponse>builder()
                .message("Cập nhật gói báo giá thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteGoiSanPham(@Valid @RequestParam int id) {
        goiBaoGiaService.deleteGoiBaoGiaById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa gói báo giá thành công")
                .build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteGoiSanPhamByList(@Valid @RequestBody GoiBaoGiaDeleteRequest request) {
        goiBaoGiaService.deleteGoiBaoGiaByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thành công các gói báo giá")
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<GoiBaoGiaResponse>>> getAllGoiSanPham(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<GoiBaoGiaResponse> response = goiBaoGiaService.getAllGoiBaoGia(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<GoiBaoGiaResponse>>builder()
                .message("Lấy toàn bộ gói báo giá thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<GoiBaoGiaResponse>> getGoiSanPhamById(@Valid @RequestParam int id) {
        GoiBaoGiaResponse response = goiBaoGiaService.getGoiBaoGiaById(id);
        return ResponseEntity.ok(ApiResponse.<GoiBaoGiaResponse>builder()
                .message("Lấy gói báo giá theo id thành công")
                .result(response)
                .build());
    }
}
