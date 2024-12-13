package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhCreateRequest;
import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhDeleteRequest;
import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhUpdateRequest;
import com.cusc.toolbaogia.dto.donvitinh.response.DonViTinhResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.DonViTinhService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/cusc-quote/v1/donvitinh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonViTinhController {
    @Autowired
    DonViTinhService donViTinhService;

    @PostMapping
    public ResponseEntity<ApiResponse<DonViTinhResponse>> createDonViTinh(
            @RequestBody @Valid DonViTinhCreateRequest request) {
        DonViTinhResponse response = donViTinhService.createDonViTinh(request);
        return ResponseEntity.status(201).body(ApiResponse.<DonViTinhResponse>builder()
                .message("Tạo đơn vị tính thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<DonViTinhResponse>> updateDonViTinh(
            @RequestBody @Valid DonViTinhUpdateRequest request) {
        DonViTinhResponse response = donViTinhService.updateDonViTinh(request);
        return ResponseEntity.ok(ApiResponse.<DonViTinhResponse>builder()
                .message("Cập nhật đơn vị tính thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteDonViTinhById(@Valid @RequestParam int id) {
        donViTinhService.deleteDonViTinhById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công đơn vị tính").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteThongSoByList(@Valid @RequestBody DonViTinhDeleteRequest request) {
        donViTinhService.deleteDonViTinhByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các đơn vị tính").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<DonViTinhResponse>>> getAllDonViTinh(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<DonViTinhResponse> response = donViTinhService.getAllDonViTinh(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<DonViTinhResponse>>builder()
                .message("Lấy toàn bộ đơn vị tính thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<DonViTinhResponse>> getDonViTinhById(@Valid @RequestParam int id) {
        DonViTinhResponse response = donViTinhService.getDonViTinhById(id);
        return ResponseEntity.ok(ApiResponse.<DonViTinhResponse>builder()
                .message("Lấy đơn vị tính theo id thành công")
                .result(response)
                .build());
    }

}
