package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucCreateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.response.SanPhamHangMucResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.services.SanPhamHangMucService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanphamhangmuc")
public class SanPhamHangMucController {

    @Autowired
    private SanPhamHangMucService sanPhamHangMucService;

    @PostMapping()
    public ResponseEntity<ApiResponse<SanPhamHangMucResponse>> createSanPhamHangMuc(
            @RequestBody @Valid SanPhamHangMucCreateRequest request) {
        SanPhamHangMucResponse response = sanPhamHangMucService.createKySanPhamHangMuc(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamHangMucResponse>builder()
                .message("Tạo sản phẩm hạng mục thành công")
                .result(response)
                .build());
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<SanPhamHangMucResponse>> updateSanPhamHangMuc(
            @RequestBody @Valid SanPhamHangMucUpdateRequest request) {
        SanPhamHangMucResponse response = sanPhamHangMucService.updateSanPhamHangMuc(request);
        return ResponseEntity.status(201).body(ApiResponse.<SanPhamHangMucResponse>builder()
                .message("Cập nhật sản phẩm hạng mục thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamHangMucById(@Valid @RequestParam int id) {
        sanPhamHangMucService.deleteSanPhamHangMucById(id);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm hạng mục").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteSanPhamHangMucByList(@Valid @RequestBody SanPhamTSKTDeleteRequest request) {
        sanPhamHangMucService.deleteSanPhamHangMucByList(request);
        return ResponseEntity
                .ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm hạng mục").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<SanPhamHangMucResponse>>> getAllSanPhamHangMuc(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<SanPhamHangMucResponse> response = sanPhamHangMucService.getAllSanPhamHangMuc(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamHangMucResponse>>builder()
                .message("Lấy toàn bộ sản phẩm hạng mục thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<SanPhamHangMucResponse>> getSanPhamHangMucById(@Valid @RequestParam int id) {
        SanPhamHangMucResponse response = sanPhamHangMucService.getSanPhamHangMucById(id);
        return ResponseEntity.ok(ApiResponse.<SanPhamHangMucResponse>builder()
                .message("Lấy sản phẩm hạng mục theo id thành công")
                .result(response)
                .build());
    }

    @GetMapping("/hangmucid")
    public ResponseEntity<ApiResponse<List<SanPhamHangMucResponse>>> getSanPhamHangMucByHangMucId(@RequestParam int hangMucId) {
        List<SanPhamHangMucResponse> response = sanPhamHangMucService.getSanPhamHangMucByHangMucId(hangMucId);
        return ResponseEntity.ok(ApiResponse.<List<SanPhamHangMucResponse>>builder()
                .message("Lấy danh sách kỹ thuật công nghệ theo hạng mục id thành công")
                .result(response)
                .build());
    }

}
