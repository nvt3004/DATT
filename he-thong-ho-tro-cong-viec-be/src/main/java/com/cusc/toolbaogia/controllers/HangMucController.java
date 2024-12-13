package com.cusc.toolbaogia.controllers;

import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cusc.toolbaogia.dto.hangmuc.request.HangMucCreateRequest;
import com.cusc.toolbaogia.dto.hangmuc.request.HangMucDeleteRequest;
import com.cusc.toolbaogia.dto.hangmuc.request.HangMucUpdateRequest;
import com.cusc.toolbaogia.dto.hangmuc.response.HangMucResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.HangMucService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/hangmuc")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HangMucController {
    HangMucService hangMucService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageImpl<HangMucResponse>>> getAllHangMucApiResponse(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "key", required = false) String key) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        PageImpl<HangMucResponse> result = hangMucService.getAllHangMuc(page, size, key);
        return ResponseEntity.ok(ApiResponse.<PageImpl<HangMucResponse>>builder()
                .message("Lấy toàn bộ hạng mục thành công")
                .result(result)
                .build());
    }

    @GetMapping("/id")
    public ResponseEntity<ApiResponse<HangMucResponse>> getHangMucApiResponse(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        HangMucResponse response = hangMucService.getHangMucById(id);
        return ResponseEntity.ok(ApiResponse.<HangMucResponse>builder()
                .message("Lấy hạng mục theo id thành công")
                .result(response)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HangMucResponse>> postHangMuc(@RequestBody @Valid HangMucCreateRequest hangMuc) {
        HangMucResponse response = hangMucService.createHangMuc(hangMuc);
        return ResponseEntity.status(201).body(ApiResponse.<HangMucResponse>builder()
                .message("Tạo hạng mục thành công")
                .result(response)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<HangMucResponse>> putHangMuc(@RequestBody @Valid HangMucUpdateRequest hangMuc) {
        HangMucResponse response = hangMucService.updateHangMuc(hangMuc);
        return ResponseEntity.ok(ApiResponse.<HangMucResponse>builder()
                .message("Cập nhật hạng mục thành công")
                .result(response)
                .build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteHangMuc(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        hangMucService.deleteHangMucById(id);
        ;
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa thành công hạng mục")
                .build());
    }

    @DeleteMapping("/ids")
    public ResponseEntity<ApiResponse<Void>> deleteHangMucByList(@Valid @RequestBody HangMucDeleteRequest request) {
        hangMucService.deleteHangMucByList(request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().message("Xóa thành công các hạng mục").build());
    }
}
