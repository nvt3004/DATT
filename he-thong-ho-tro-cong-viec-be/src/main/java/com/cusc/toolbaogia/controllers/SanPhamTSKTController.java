package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTCreateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.response.SanPhamTSKTResponse;
import com.cusc.toolbaogia.services.SanPhamTSKTService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanphamtskt")
public class SanPhamTSKTController {

    @Autowired
    private SanPhamTSKTService sanPhamTSKTService;

    @PostMapping()
    public ResponseEntity<ApiResponse<SanPhamTSKTResponse>> createPhanMemTSKT(
            @RequestBody @Valid SanPhamTSKTCreateRequest request) {
        SanPhamTSKTResponse response = sanPhamTSKTService.createSanPhamTSKT(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamTSKTResponse>builder()
                .message("Tạo thông số thành công")
                .result(response)
                .build());
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<SanPhamTSKTResponse>> updatePhanMemTSKT(
            @RequestBody @Valid SanPhamTSKTUpdateRequest request) {
        SanPhamTSKTResponse response = sanPhamTSKTService.updateSanPhamTSKT(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamTSKTResponse>builder()
                .message("Cập nhật sản phẩm thông số kỹ thuật thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deletePhanMemTSKTById(@Valid @RequestParam int id) {
        sanPhamTSKTService.deleteSanPhamTSKTById(id);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm thông số kỹ thuật").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deletePhanMemTSKTByList(@Valid @RequestBody SanPhamTSKTDeleteRequest request) {
        sanPhamTSKTService.deleteSanPhamTSKTByList(request);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm thông số kỹ thuật").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<SanPhamTSKTResponse>>> getAllPhanMemTSKT(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<SanPhamTSKTResponse> response = sanPhamTSKTService.getAllSanPhamTSKT(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamTSKTResponse>>builder()
                .message("Lấy toàn bộ sản phẩm thông số kỹ thuật thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<SanPhamTSKTResponse>> getThongSoById(@Valid @RequestParam int id) {
        SanPhamTSKTResponse response = sanPhamTSKTService.getSanPhamTSKTById(id);
        return ResponseEntity.ok(ApiResponse.<SanPhamTSKTResponse>builder()
                .message("Lấy sản phẩm thông số kỹ thuật theo id thành công")
                .result(response)
                .build());
    }

}
