package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucCreateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucDeleteRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.response.ChucNangHangMucResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.ChucNangHangMucService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/chucnanghangmuc")
public class ChucNangHangMucController {

    @Autowired
    private ChucNangHangMucService chucNangHangMucService;

    @PostMapping
    public ResponseEntity<ApiResponse<List<ChucNangHangMucResponse>>> createChucNangHangMuc(
            @RequestBody @Valid ChucNangHangMucCreateRequest request) {
        List<ChucNangHangMucResponse> responseList = chucNangHangMucService.createChucNangHangMuc(request);
        return ResponseEntity.status(201).body(ApiResponse.<List<ChucNangHangMucResponse>>builder()
                .message("Tạo chức năng hạng mục thành công")
                .result(responseList)
                .build());
    }
    

    @PutMapping
    public ResponseEntity<ApiResponse<ChucNangHangMucResponse>> updateChucNangHangMuc(
            @RequestBody @Valid ChucNangHangMucUpdateRequest request) {
        ChucNangHangMucResponse response = chucNangHangMucService.updateChucNangHangMuc(request);
        return ResponseEntity.ok(ApiResponse.<ChucNangHangMucResponse>builder()
                .message("Cập nhật chức năng hạng mục thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteChucNangHangMucById(@Valid @RequestParam int id) {
        chucNangHangMucService.deleteChucNangHangMucById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công chức năng hạng mục").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteChucNangHangMucByList(@Valid @RequestBody ChucNangHangMucDeleteRequest request) {
        chucNangHangMucService.deleteChucNangHangMucByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các chức năng hạng mục").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<ChucNangHangMucResponse>>> getAllChucNangHangMuc(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<ChucNangHangMucResponse> response = chucNangHangMucService.getAllChucNangHangMuc(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<ChucNangHangMucResponse>>builder()
                .message("Lấy toàn bộ chức năng hạng mục thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<ChucNangHangMucResponse>> getThongSoById(@Valid @RequestParam int id) {
        ChucNangHangMucResponse response = chucNangHangMucService.getChucNangHangMucById(id);
        return ResponseEntity.ok(ApiResponse.<ChucNangHangMucResponse>builder()
                .message("Lấy chức năng hạng mục theo id thành công")
                .result(response)
                .build());
    }

}
