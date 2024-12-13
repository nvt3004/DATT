package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTCreateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTDeleteRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTUpdateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.response.BaoGiaPhuongThucTTResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.BaoGiaPhuongThucThanhToanService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/baogiaphuongthucthanhtoan")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoGiaPhuongThucTTController {

    @Autowired
    private BaoGiaPhuongThucThanhToanService baoGiaPTTTService;

    @PostMapping
    public ResponseEntity<ApiResponse<BaoGiaPhuongThucTTResponse>> createBaoGiaPTTT(
            @RequestBody @Valid BaoGiaPhuongThucTTCreateRequest request) {
        BaoGiaPhuongThucTTResponse response = baoGiaPTTTService.createBaoGiaPhuongThucThanhToan(request);
        return ResponseEntity.status(201).body(ApiResponse.<BaoGiaPhuongThucTTResponse>builder()
                .message("Tạo báo giá phương thức thanh toán thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<BaoGiaPhuongThucTTResponse>> updateThongSo(
            @RequestBody @Valid BaoGiaPhuongThucTTUpdateRequest request) {
                BaoGiaPhuongThucTTResponse response = baoGiaPTTTService.updateBaoGiaPhuongThucThanhToan(request);
        return ResponseEntity.ok(ApiResponse.<BaoGiaPhuongThucTTResponse>builder()
                .message("Cập nhật báo giá phương thức thanh toán thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteThongSoById(@Valid @RequestParam int id) {
        baoGiaPTTTService.deleteBaoGiaPhuongThucTTById(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công báo giá phương thức thanh toán").build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteThongSoByList(@Valid @RequestBody BaoGiaPhuongThucTTDeleteRequest request) {
        baoGiaPTTTService.deleteBaoGiaPhuongThucTTByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các báo giá phương thức thanh toán").build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<BaoGiaPhuongThucTTResponse>>> getAllBaoGiaPhuongThucThanhToan(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        PageImpl<BaoGiaPhuongThucTTResponse> response = baoGiaPTTTService.getAllBaoGiaPhuongThucThanhToan(page, size);
        return ResponseEntity.ok(ApiResponse.<PageImpl<BaoGiaPhuongThucTTResponse>>builder()
                .message("Lấy toàn bộ báo giá phương thức thanh toán thành công")
                .result(response)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<BaoGiaPhuongThucTTResponse>> getBaoGiaPhuongThucThanhToanById(@Valid @RequestParam int id) {
        BaoGiaPhuongThucTTResponse response = baoGiaPTTTService.getBaoGiaPhuongThucThanhToanById(id);
        return ResponseEntity.ok(ApiResponse.<BaoGiaPhuongThucTTResponse>builder()
                .message("Lấy báo giá phương thức thanh toán theo id thành công")
                .result(response)
                .build());
    }
}
