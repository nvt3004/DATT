package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.chucnang.request.ChucNangCreateRequest;
import com.cusc.toolbaogia.dto.chucnang.request.ChucNangDeleteRequest;
import com.cusc.toolbaogia.dto.chucnang.request.ChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.chucnang.response.ChucNangResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.ChucNangService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/chucnang")
public class ChucNangController {

    @Autowired
    private ChucNangService chucNangService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChucNangResponse>> createChucNang(
            @RequestBody @Valid ChucNangCreateRequest request) {
        ChucNangResponse response = chucNangService.createChucNang(request);
        return ResponseEntity.status(201).body(ApiResponse.<ChucNangResponse>builder()
                .message("Tạo chức năng thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ChucNangResponse>> updateThongSo(
            @RequestBody @Valid ChucNangUpdateRequest request) {
        ChucNangResponse response = chucNangService.updateChucNang(request);
        return ResponseEntity.ok(ApiResponse.<ChucNangResponse>builder()
                .message("Cập nhật chức năng thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteChucNangById(@Valid @RequestParam int id) {
        chucNangService.deleteChucNangById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công chức năng").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteChucNangByList(@Valid @RequestBody ChucNangDeleteRequest request) {
        chucNangService.deleteChucNangByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các chức năng").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<ChucNangResponse>>> getAllChucNang(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<ChucNangResponse> response = chucNangService.getAllChucNang(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<ChucNangResponse>>builder()
                .message("Lấy toàn bộ chức năng thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<ChucNangResponse>> getChucNangById(@Valid @RequestParam int id) {
        ChucNangResponse response = chucNangService.getChucNangById(id);
        return ResponseEntity.ok(ApiResponse.<ChucNangResponse>builder()
                .message("Lấy chức năng theo id thành công")
                .result(response)
                .build());
    }

}
