package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanCreateRequest;
import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanDeleteRequest;
import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.tacnhan.response.TacNhanResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.TacNhanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/tacnhan")
public class TacNhanController {

        @Autowired
        private TacNhanService tacNhanService;

        @PostMapping
        public ResponseEntity<ApiResponse<TacNhanResponse>> createTacNhan(
                        @RequestBody TacNhanCreateRequest request) {
                TacNhanResponse response = tacNhanService.createTacNhan(request);
                return ResponseEntity.status(201).body(ApiResponse.<TacNhanResponse>builder()
                                .message("Tạo tác nhân thành công.")
                                .result(response)
                                .build());
        }

        @PutMapping
        public ResponseEntity<ApiResponse<TacNhanResponse>> updateTacNhan(
                        @RequestBody TacNhanUpdateRequest request) {
                TacNhanResponse response = tacNhanService.updateTacNhan(request);
                return ResponseEntity.ok(ApiResponse.<TacNhanResponse>builder()
                                .message("Cập nhật tác nhân thành công.")
                                .result(response)
                                .build());
        }

        @DeleteMapping("/ids")
        public ResponseEntity<ApiResponse<Void>> deleteTacNhanByList(@Valid @RequestBody TacNhanDeleteRequest request) {
                tacNhanService.deleteTacNhanByList(request);
                return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các tác nhân").build());
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<Void>> deleteTacNhan(
                        @Valid @RequestParam int id) {
                tacNhanService.deleteTacNhanById(id);
                return ResponseEntity.ok(ApiResponse.<Void>builder()
                                .message("Xóa tác nhân thành công.")
                                .build());
        }

        @GetMapping
        public ResponseEntity<ApiResponse<Page<TacNhanResponse>>> getAllTacNhan(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size) {
                PageImpl<TacNhanResponse> response = tacNhanService.getAllTacNhan(page, size);
                return ResponseEntity.ok(ApiResponse.<Page<TacNhanResponse>>builder()
                                .message("Lấy danh sách tác nhân thành công.")
                                .result(response)
                                .build());
        }

        @GetMapping("/id")
        public ResponseEntity<ApiResponse<TacNhanResponse>> getTacNhanById(@RequestParam int id) {
                TacNhanResponse response = tacNhanService.getTacNhanById(id);
                return ResponseEntity.ok(ApiResponse.<TacNhanResponse>builder()
                                .message("Lấy thông tin tác nhân thành công.")
                                .result(response)
                                .build());
        }
}
