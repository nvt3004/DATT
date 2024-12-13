package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamCreateRequest;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamDeleteRequest;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamUpdateRequest;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamResponse;
import com.cusc.toolbaogia.services.SanPhamService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanpham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    @PostMapping
    public ResponseEntity<ApiResponse<SanPhamResponse>> createSanPham(
            @RequestBody @Valid SanPhamCreateRequest request) {
        SanPhamResponse response = sanPhamService.createSanPham(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamResponse>builder()
                .message("Tạo sản phẩm thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SanPhamResponse>> updateSanPham(
            @RequestBody @Valid SanPhamUpdateRequest request) {
        SanPhamResponse response = sanPhamService.updateSanPham(request);
        return ResponseEntity.ok(ApiResponse.<SanPhamResponse>builder()
                .message("Cập nhật sản phẩm thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamById(@Valid @RequestParam int id) {
        sanPhamService.deleteSanPhamById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamByList(@Valid @RequestBody SanPhamDeleteRequest request) {
        sanPhamService.deleteSanPhamByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<SanPhamResponse>>> getAllSanPham(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<SanPhamResponse> response = sanPhamService.getAllSanPham(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamResponse>>builder()
                .message("Lấy toàn bộ sản phẩm thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<SanPhamResponse>> getSanPhamById(@Valid @RequestParam int id) {
        SanPhamResponse response = sanPhamService.getSanPhamById(id);
        return ResponseEntity.ok(ApiResponse.<SanPhamResponse>builder()
                .message("Lấy sản phẩm theo id thành công")
                .result(response)
                .build());
    }
}
