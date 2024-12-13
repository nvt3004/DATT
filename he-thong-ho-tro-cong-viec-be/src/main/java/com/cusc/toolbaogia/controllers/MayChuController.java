package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.maychu.request.MayChuCreateRequest;
import com.cusc.toolbaogia.dto.maychu.request.MayChuDeleteRequest;
import com.cusc.toolbaogia.dto.maychu.request.MayChuUpdateRequest;
import com.cusc.toolbaogia.dto.maychu.response.MayChuResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.MayChuService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cusc-quote/v1/maychu")
@RequiredArgsConstructor
public class MayChuController {

    private final MayChuService mayChuService;

    @PostMapping
    public ResponseEntity<ApiResponse<MayChuResponse>> createMayChu(@RequestBody @Valid MayChuCreateRequest request) {
        MayChuResponse response = mayChuService.createMayChu(request);
        return ResponseEntity.status(201).body(ApiResponse.<MayChuResponse>builder()
                .message("Tạo máy chủ thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<MayChuResponse>> updateMayChu(@RequestBody @Valid MayChuUpdateRequest request) {
        MayChuResponse response = mayChuService.updateMayChu(request);
        return ResponseEntity.ok(ApiResponse.<MayChuResponse>builder()
                .message("Cập nhật máy chủ thành công")
                .result(response)
                .build());
    }

    @DeleteMapping("/id")
    public ResponseEntity<ApiResponse<Void>> deleteMayChuById(@RequestParam int id) {
        mayChuService.deleteMayChuById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa máy chủ thành công")
                .build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteMayChuByList(@RequestBody @Valid MayChuDeleteRequest request) {
        mayChuService.deleteMayChuByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thành công các máy chủ")
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<MayChuResponse>>> getAllMayChu(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<MayChuResponse> response = mayChuService.getAllMayChu(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<MayChuResponse>>builder()
                .message("Lấy tất cả máy chủ thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<MayChuResponse>> getMayChuById(@RequestParam Integer id) {
        MayChuResponse response = mayChuService.getMayChuById(id);
        return ResponseEntity.ok(ApiResponse.<MayChuResponse>builder()
                .message("Lấy máy chủ theo id thành công")
                .result(response)
                .build());
    }
}
