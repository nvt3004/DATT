package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.thongso.request.ThongSoCreateRequest;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoDeleteRequest;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoUpdateRequest;
import com.cusc.toolbaogia.dto.thongso.response.ThongSoResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.ThongSoService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/thongso")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThongSoController {

    ThongSoService thongSoService;

    @PostMapping
    public ResponseEntity<ApiResponse<ThongSoResponse>> createThongSo(
            @RequestBody @Valid ThongSoCreateRequest request) {
        ThongSoResponse response = thongSoService.createThongSo(request);
        return ResponseEntity.status(201).body(ApiResponse.<ThongSoResponse>builder()
                .message("Tạo thông số thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ThongSoResponse>> updateThongSo(
            @RequestBody @Valid ThongSoUpdateRequest request) {
        ThongSoResponse response = thongSoService.updateThongSo(request);
        return ResponseEntity.ok(ApiResponse.<ThongSoResponse>builder()
                .message("Cập nhật thông số thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteThongSoById(@Valid @RequestParam int id) {
        thongSoService.deleteThongSoById(id); 
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công thông số").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteThongSoByList(@Valid @RequestBody ThongSoDeleteRequest request) {
        thongSoService.deleteThongSoByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các thông số").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<ThongSoResponse>>> getAllThongSo(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<ThongSoResponse> response = thongSoService.getAllThongSo(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<ThongSoResponse>>builder()
                .message("Lấy toàn bộ thông số thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<ThongSoResponse>> getThongSoById(@Valid @RequestParam int id) {
        ThongSoResponse response = thongSoService.getThongSoById(id);
        return ResponseEntity.ok(ApiResponse.<ThongSoResponse>builder()
                .message("Lấy thông số theo id thành công")
                .result(response)
                .build());
    }
}
