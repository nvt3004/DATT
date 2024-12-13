package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.response.SanPhamBaoGiaResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.services.SanPhamBaoGiaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanphambaogia")
public class SanPhamBaoGiaController {

    @Autowired
    private SanPhamBaoGiaService sanPhamBaoGiaService;

    @PostMapping()
    public ResponseEntity<ApiResponse<SanPhamBaoGiaResponse>> createSanPhamBaoGia(
            @RequestBody @Valid SanPhamBaoGiaCreateRequest request) {
        SanPhamBaoGiaResponse response = sanPhamBaoGiaService.createSanPhamBaoGia(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamBaoGiaResponse>builder()
                .message("Tạo thông số thành công")
                .result(response)
                .build());
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<SanPhamBaoGiaResponse>> updateSanPhamBaoGia(
            @RequestBody @Valid SanPhamBaoGiaUpdateRequest request) {
        SanPhamBaoGiaResponse response = sanPhamBaoGiaService.updateSanPhamBaoGia(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamBaoGiaResponse>builder()
                .message("Cập nhật sản phẩm sản phẩm báo giá thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamBaoGiaById(@Valid @RequestParam int id) {
        sanPhamBaoGiaService.deleteSanPhamBaoGiaById(id);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm sản phẩm báo giá").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamBaoGiaByList(@Valid @RequestBody SanPhamTSKTDeleteRequest request) {
        sanPhamBaoGiaService.deleteSanPhamBaoGiaByList(request);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm sản phẩm báo giá").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<SanPhamBaoGiaResponse>>> getAllSanPhamBaoGia(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<SanPhamBaoGiaResponse> response = sanPhamBaoGiaService.getAllSanPhamBaoGia(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamBaoGiaResponse>>builder()
                .message("Lấy toàn bộ sản phẩm sản phẩm báo giá thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<SanPhamBaoGiaResponse>> getSanPhamBaoGiaById(@Valid @RequestParam int id) {
        SanPhamBaoGiaResponse response = sanPhamBaoGiaService.getSanPhamBaoGiaById(id);
        return ResponseEntity.ok(ApiResponse.<SanPhamBaoGiaResponse>builder()
                .message("Lấy sản phẩm sản phẩm báo giá theo id thành công")
                .result(response)
                .build());
    }

    @GetMapping("/baoGiaId")
    public ResponseEntity<ApiResponse<SanPhamBaoGiaResponse>> getSanPhamBaoGiaByBaoGiaId(@Valid @RequestParam int baoGiaId) {
        SanPhamBaoGiaResponse response = sanPhamBaoGiaService.getSanPhamBaoGiaByBaoGiaId(baoGiaId);
        return ResponseEntity.ok(ApiResponse.<SanPhamBaoGiaResponse>builder()
                .message("Lấy sản phẩm sản phẩm báo giá theo báo giá id thành công")
                .result(response)
                .build());
    }

}
