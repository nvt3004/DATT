package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.thongso.request.ThongSoDeleteRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.response.NhomChucNangTacNhanResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.NhomChucNangTacNhanService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/nhomchucnangtacnhan")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NhomChucNangTacNhanController {

    NhomChucNangTacNhanService chucNangTacNhanService;

    @PostMapping
    public ResponseEntity<ApiResponse<NhomChucNangTacNhanResponse>> createChucNangTacNhan(
            @RequestBody @Valid NhomChucNangTacNhanCreateRequest request) {
        NhomChucNangTacNhanResponse response = chucNangTacNhanService.createNhomChucNangTacNhan(request);
        return ResponseEntity.status(201).body(ApiResponse.<NhomChucNangTacNhanResponse>builder()
                .message("Tạo nhóm chức năng tác nhân thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<NhomChucNangTacNhanResponse>> updateChucNangTacNhan(
            @RequestBody @Valid NhomChucNangTacNhanUpdateRequest request) {
                NhomChucNangTacNhanResponse response = chucNangTacNhanService.updateNhomChucNangTacNhan(request);
        return ResponseEntity.ok(ApiResponse.<NhomChucNangTacNhanResponse>builder()
                .message("Cập nhật nhóm chức năng tác nhân thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteChucNangTacNhanById(@Valid @RequestParam int id) {
        chucNangTacNhanService.deleteNhomChucNangTacNhanById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công nhóm chức năng tác nhân").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteChucNangTacNhanByList(@Valid @RequestBody ThongSoDeleteRequest request) {
        chucNangTacNhanService.deleteNhomChucNangTacNhanByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các nhóm chức năng tác nhân").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<NhomChucNangTacNhanResponse>>> getAllChucNangTacNhan(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<NhomChucNangTacNhanResponse> response = chucNangTacNhanService.getAllNhomChucNangTacNhan(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<NhomChucNangTacNhanResponse>>builder()
                .message("Lấy toàn bộ nhóm chức năng tác nhân thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<NhomChucNangTacNhanResponse>> getChucNangTacNhanById(@Valid @RequestParam int id) {
        NhomChucNangTacNhanResponse response = chucNangTacNhanService.getNhomChucNangTacNhanById(id);
        return ResponseEntity.ok(ApiResponse.<NhomChucNangTacNhanResponse>builder()
                .message("Lấy chức năng nhóm tác nhân theo id thành công")
                .result(response)
                .build());
    }
}
