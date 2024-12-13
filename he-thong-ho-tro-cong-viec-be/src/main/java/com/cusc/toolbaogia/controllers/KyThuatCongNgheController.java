package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.apiresponse2.ApiResponse2;
import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheCreateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheUpdateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.response.KyThuatCongNgheResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.services.KyThuatCongNgheService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/kythuatcongnghe")
public class KyThuatCongNgheController {

        @Autowired
        private KyThuatCongNgheService kyThuatCongNgheService;

        @PostMapping()
        public ResponseEntity<ApiResponse<KyThuatCongNgheResponse>> createKyThuatCongNghe(
                        @RequestBody @Valid KyThuatCongNgheCreateRequest request) {
                KyThuatCongNgheResponse response = kyThuatCongNgheService.createKyThuatCongNghe(request);
                return ResponseEntity.status(201).body(ApiResponse.<KyThuatCongNgheResponse>builder()
                                .message("Tạo thông số thành công")
                                .result(response)
                                .build());
        }

        @PutMapping()
        public ResponseEntity<ApiResponse<KyThuatCongNgheResponse>> updateKyThuatCongNghe(
                        @RequestBody @Valid KyThuatCongNgheUpdateRequest request) {
                KyThuatCongNgheResponse response = kyThuatCongNgheService.updateKyThuatCongNghe(request);
                return ResponseEntity.status(201).body(ApiResponse.<KyThuatCongNgheResponse>builder()
                                .message("Cập nhật sản phẩm kỹ thuật công nghệ thành công")
                                .result(response)
                                .build());
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<Void>> deleteKyThuatCongNgheById(@Valid @RequestParam int id) {
                kyThuatCongNgheService.deleteKyThuatCongNgheById(id);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder().message("Xóa thành công sản phẩm kỹ thuật công nghệ")
                                                .build());
        }

        @DeleteMapping("/ids")
        public ResponseEntity<ApiResponse<Void>> deleteKyThuatCongNgheByList(
                        @Valid @RequestBody SanPhamTSKTDeleteRequest request) {
                kyThuatCongNgheService.deleteKyThuatCongNgheByList(request);
                return ResponseEntity
                                .ok(ApiResponse.<Void>builder()
                                                .message("Xóa thành công các sản phẩm kỹ thuật công nghệ").build());
        }

        @GetMapping
        public ResponseEntity<ApiResponse<PageImpl<KyThuatCongNgheResponse>>> getAllKyThuatCongNghe(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size) {
                PageImpl<KyThuatCongNgheResponse> response = kyThuatCongNgheService.getAllKyThuatCongNghe(page, size);
                return ResponseEntity.ok(ApiResponse.<PageImpl<KyThuatCongNgheResponse>>builder()
                                .message("Lấy toàn bộ sản phẩm kỹ thuật công nghệ thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/id")
        public ResponseEntity<ApiResponse<KyThuatCongNgheResponse>> getKyThuatCongNgheById(
                        @Valid @RequestParam int id) {
                KyThuatCongNgheResponse response = kyThuatCongNgheService.getKyThuatCongNgheById(id);
                return ResponseEntity.ok(ApiResponse.<KyThuatCongNgheResponse>builder()
                                .message("Lấy sản phẩm kỹ thuật công nghệ theo id thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/baogiaid")
        public ResponseEntity<ApiResponse2<List<KyThuatCongNgheResponse>>> getKyThuatCongNgheByBaoGiaId(
                        @RequestParam int baoGiaId) {
                ApiResponse2<List<KyThuatCongNgheResponse>> response = kyThuatCongNgheService
                                .getKyThuatCongNgheByBaoGiaId(baoGiaId);
                return ResponseEntity.ok(response);
        }

}
