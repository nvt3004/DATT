package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuListCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.response.SanPhamMayChuResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.services.SanPhamMayChuService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanphammaychu")
public class SanPhamMayChuController {

        @Autowired
        private SanPhamMayChuService sanPhamMayChuService;

        @PostMapping()
        public ResponseEntity<ApiResponse<SanPhamMayChuResponse>> createSanPhamMayChu(
                        @RequestBody @Valid SanPhamMayChuCreateRequest request) {
                SanPhamMayChuResponse response = sanPhamMayChuService.createSanPhamMayChu(request);
                return ResponseEntity.status(201).body(ApiResponse.<SanPhamMayChuResponse>builder()
                                .message("Tạo sản phẩm máy chủ thành công")
                                .result(response)
                                .build());
        }

        @PostMapping("/list")
        public ResponseEntity<ApiResponse<List<SanPhamMayChuResponse>>> createSanPhamMayChu(
                        @RequestBody @Valid SanPhamMayChuListCreateRequest request) {
                List<SanPhamMayChuResponse> response = sanPhamMayChuService.createSanPhamMayChu(request);
                return ResponseEntity.status(201).body(ApiResponse.<List<SanPhamMayChuResponse>>builder()
                                .message("Tạo danh sách sản phẩm máy chủ thành công")
                                .result(response)
                                .build());
        }

        @PutMapping()
        public ResponseEntity<ApiResponse<SanPhamMayChuResponse>> updateSanPhamMayChu(
                        @RequestBody @Valid SanPhamMayChuUpdateRequest request) {
                SanPhamMayChuResponse response = sanPhamMayChuService.updateSanPhamMayChu(request);
                return ResponseEntity.status(201).body(ApiResponse.<SanPhamMayChuResponse>builder()
                                .message("Cập nhật sản phẩm máy chủ thành công")
                                .result(response)
                                .build());
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<Void>> deleteSanPhamMayChuById(@Valid @RequestParam int id) {
                sanPhamMayChuService.deleteSanPhamMayChuById(id);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm máy chủ").build());
        }

        @DeleteMapping("/ids")
        public ResponseEntity<ApiResponse<Void>> deleteSanPhamMayChuByList(
                        @Valid @RequestBody SanPhamTSKTDeleteRequest request) {
                sanPhamMayChuService.deleteSanPhamMayChuByList(request);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm máy chủ").build());
        }

        @GetMapping
        public ResponseEntity<ApiResponse<PageImpl<SanPhamMayChuResponse>>> getAllSanPhamMayChu(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size) {
                PageImpl<SanPhamMayChuResponse> response = sanPhamMayChuService.getAllSanPhamMayChu(page, size);
                return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamMayChuResponse>>builder()
                                .message("Lấy toàn bộ sản phẩm máy chủ thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/id")
        public ResponseEntity<ApiResponse<SanPhamMayChuResponse>> getSanPhamMayChuById(@Valid @RequestParam int id) {
                SanPhamMayChuResponse response = sanPhamMayChuService.getSanPhamMayChuById(id);
                return ResponseEntity.ok(ApiResponse.<SanPhamMayChuResponse>builder()
                                .message("Lấy sản phẩm máy chủ theo id thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/sanphambgid")
        public ResponseEntity<ApiResponse<List<SanPhamMayChuResponse>>> getSanPhamMayChuBySanPhamBGId(
                        @RequestParam int sanPhamBGId) {
                List<SanPhamMayChuResponse> response = sanPhamMayChuService
                                .getSanPhamMayChuBySanPhamBaoGiaId(sanPhamBGId);
                return ResponseEntity.ok(ApiResponse.<List<SanPhamMayChuResponse>>builder()
                                .message("Lấy danh sách sản phẩm máy chủ theo sản phẩm báo giá thành công")
                                .result(response)
                                .build());
        }

}
