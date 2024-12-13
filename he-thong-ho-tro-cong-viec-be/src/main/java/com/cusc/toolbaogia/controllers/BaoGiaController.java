package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.baogia.request.BaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baogia.request.BaoGiaDeleteRequest;
import com.cusc.toolbaogia.dto.baogia.request.BaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baogia.response.BaoGiaResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.BaoGiaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/baogia")
public class BaoGiaController {

    @Autowired
    private BaoGiaService baoGiaService;

    @PostMapping
    public ResponseEntity<ApiResponse<BaoGiaResponse>> createBaoGia(
            @RequestBody @Valid BaoGiaCreateRequest request) {
        BaoGiaResponse response = baoGiaService.createBaoGia(request);
        return ResponseEntity.status(201).body(ApiResponse.<BaoGiaResponse>builder()
                .message("Tạo báo giá thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<BaoGiaResponse>> updateBaoGia(
            @RequestBody @Valid BaoGiaUpdateRequest request) {
        BaoGiaResponse response = baoGiaService.updateBaoGia(request);
        return ResponseEntity.ok(ApiResponse.<BaoGiaResponse>builder()
                .message("Cập nhật báo giá thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteBaoGiaById(@Valid @RequestParam int id) {
        baoGiaService.deleteBaoGiaById(id); 
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công báo giá").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteBaoGiaByList(@Valid @RequestBody BaoGiaDeleteRequest request) {
        baoGiaService.deleteBaoGiaByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các báo giá").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<BaoGiaResponse>>> getAllBaoGia(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<BaoGiaResponse> response = baoGiaService.getAllBaoGia(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<BaoGiaResponse>>builder()
                .message("Lấy toàn bộ báo giá thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<BaoGiaResponse>> getBaoGiaById(@Valid @RequestParam int id) {
        BaoGiaResponse response = baoGiaService.getBaoGiaById(id);
        return ResponseEntity.ok(ApiResponse.<BaoGiaResponse>builder()
                .message("Lấy báo giá theo id thành công")
                .result(response)
                .build());
    }
}
