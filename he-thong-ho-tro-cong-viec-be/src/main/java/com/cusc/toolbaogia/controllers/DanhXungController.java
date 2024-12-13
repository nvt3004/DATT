package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.danhxung.request.DanhXungCreateRequest;
import com.cusc.toolbaogia.dto.danhxung.request.DanhXungDeleteRequest;
import com.cusc.toolbaogia.dto.danhxung.request.DanhXungUpdateRequest;
import com.cusc.toolbaogia.dto.danhxung.response.DanhXungResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.DanhXungService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/danhxung")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DanhXungController {
    DanhXungService danhXungService;

    @PostMapping
    public ResponseEntity<ApiResponse<DanhXungResponse>> createDanhXung(
            @RequestBody @Valid DanhXungCreateRequest request) {
        DanhXungResponse response = danhXungService.createDanhXung(request);
        return ResponseEntity.status(201).body(ApiResponse.<DanhXungResponse>builder()
                .message("Tạo danh xưng danh xưng thành công").result(response).build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<DanhXungResponse>> updateDanhXung(
            @RequestBody @Valid DanhXungUpdateRequest request) {
        DanhXungResponse response = danhXungService.updateDanhXung(request);
        return ResponseEntity.ok(ApiResponse.<DanhXungResponse>builder().message("Cập nhật danh xưng thành công")
                .result(response).build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteDanhXungById(@Valid @RequestParam int id) {
        danhXungService.deleteDanhXungById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công danh xưng").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteDanhXungByList(@Valid @RequestBody DanhXungDeleteRequest request) {
        danhXungService.deleteDanhXungByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các danh xưng").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<DanhXungResponse>>> getAllDanhXung(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<DanhXungResponse> response = danhXungService.getAllDanhXung(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<DanhXungResponse>>builder()
                .message("Lấy toàn bộ danh xưng thành công").result(response).build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<DanhXungResponse>> getDanhXungById(@RequestParam int id) {
        DanhXungResponse response = danhXungService.getDanhXungById(id);
        return ResponseEntity.ok(ApiResponse.<DanhXungResponse>builder().message("Lấy danh xưng theo id thành công")
                .result(response).build());
    }
}
