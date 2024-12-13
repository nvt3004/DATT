package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangDeleteRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.NhomChucNangService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/nhomchucnang")
public class NhomChucNangController {

    @Autowired
    private NhomChucNangService nhomChucNangService;

    @PostMapping
    public ResponseEntity<ApiResponse<NhomChucNangResponse>> createNhomChucNang(
            @RequestBody @Valid NhomChucNangCreateRequest request) {
        NhomChucNangResponse response = nhomChucNangService.createNhomChucNang(request);
        return ResponseEntity.status(201).body(ApiResponse.<NhomChucNangResponse>builder()
                .message("Tạo nhóm chức năng thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<NhomChucNangResponse>> updateNhomChucNang(
            @RequestBody @Valid NhomChucNangUpdateRequest request) {
        NhomChucNangResponse response = nhomChucNangService.updateNhomChucNang(request);
        return ResponseEntity.ok(ApiResponse.<NhomChucNangResponse>builder()
                .message("Cập nhật nhóm chức năng thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteNhomChucNang(@Valid @RequestParam int id) {
        nhomChucNangService.deleteNhomChucNangById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công nhóm chức năng").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteNhomChucNangByList(
            @Valid @RequestBody NhomChucNangDeleteRequest request) {
        nhomChucNangService.deleteNhomChucNangByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các nhóm chức năng").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<NhomChucNangResponse>>> getAllNhomChucNang(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<NhomChucNangResponse> response = nhomChucNangService.getAllNhomChucNang(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<NhomChucNangResponse>>builder()
                .message("Lấy toàn bộ nhóm chức năng thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<NhomChucNangResponse>> getNhomChucNangById(@Valid @RequestParam int id) {
        NhomChucNangResponse response = nhomChucNangService.getNhomChucNangById(id);
        return ResponseEntity.ok(ApiResponse.<NhomChucNangResponse>builder()
                .message("Lấy nhóm chức năng theo id thành công")
                .result(response)
                .build());
    }
}
