package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTDeleteRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.response.SanPhamMCCTResponse;
import com.cusc.toolbaogia.services.SanPhamMayChuChiTietService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/sanphammaychuchitiet")
public class SanPhamMayChuChiTietController {

        @Autowired
        private SanPhamMayChuChiTietService sanPhamMayChuChiTietService;

        @PostMapping()
        public ResponseEntity<ApiResponse<SanPhamMCCTResponse>> createSanPhamMayChuChiTiet(
                        @RequestBody @Valid SanPhamMCCTCreateRequest request) {
                SanPhamMCCTResponse response = sanPhamMayChuChiTietService.createSanPhamMayChuChiTiet(request);
                return ResponseEntity.status(201).body(ApiResponse.<SanPhamMCCTResponse>builder()
                                .message("Tạo sản phẩm máy chủ chi tiết thành công")
                                .result(response)
                                .build());
        }

        @PutMapping()
        public ResponseEntity<ApiResponse<SanPhamMCCTResponse>> updateSanPhamMayChuChiTiet(
                        @RequestBody @Valid SanPhamMCCTUpdateRequest request) {
                SanPhamMCCTResponse response = sanPhamMayChuChiTietService.updateSanPhamMayChuChiTiet(request);
                return ResponseEntity.status(201).body(ApiResponse.<SanPhamMCCTResponse>builder()
                                .message("Cập nhật sản phẩm máy chủ chi tiết thành công")
                                .result(response)
                                .build());
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<Void>> deleteSanPhamMayChuChiTietById(@Valid @RequestParam int id) {
                sanPhamMayChuChiTietService.deleteSanPhamMayChuChiTietById(id);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm máy chủ chi tiết")
                                                .build());
        }

        @DeleteMapping("/ids")
        public ResponseEntity<ApiResponse<Void>> deleteSanPhamMayChuChiTietByList(
                        @Valid @RequestBody SanPhamMCCTDeleteRequest request) {
                sanPhamMayChuChiTietService.deleteSanPhamMayChuChiTietByList(request);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder().message("Xóa thành công các sản phẩm máy chủ chi tiết")
                                                .build());
        }

        @GetMapping
        public ResponseEntity<ApiResponse<PageImpl<SanPhamMCCTResponse>>> getAllSanPhamMayChuChiTiet(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size) {
                PageImpl<SanPhamMCCTResponse> response = sanPhamMayChuChiTietService.getAllSanPhamMayChuChiTiet(page,
                                size);
                return ResponseEntity.ok(ApiResponse.<PageImpl<SanPhamMCCTResponse>>builder()
                                .message("Lấy toàn bộ sản phẩm máy chủ chi tiết thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/id")
        public ResponseEntity<ApiResponse<SanPhamMCCTResponse>> getSanPhamMayChuChiTietById(
                        @Valid @RequestParam int id) {
                SanPhamMCCTResponse response = sanPhamMayChuChiTietService.getSanPhamMayChuChiTietById(id);
                return ResponseEntity.ok(ApiResponse.<SanPhamMCCTResponse>builder()
                                .message("Lấy sản phẩm máy chủ chi tiết theo id thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/sanphammcid")
        public ResponseEntity<ApiResponse<List<SanPhamMCCTResponse>>> getSanPhamMayChuBySanPhamBGId(
                        @RequestParam int sanPhamMCId) {
                List<SanPhamMCCTResponse> response = sanPhamMayChuChiTietService
                                .getSanPhamMCCTByMayChuId(sanPhamMCId);
                return ResponseEntity.ok(ApiResponse.<List<SanPhamMCCTResponse>>builder()
                                .message("Lấy danh sách sản phẩm máy chủ chi tiết theo sản phẩm máy chủ thành công")
                                .result(response)
                                .build());
        }

}
