package com.cusc.toolbaogia.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.baogiakhachhang.request.BaoGiaKhachHangCreateRequest;
import com.cusc.toolbaogia.dto.baogiakhachhang.request.BaoGiaKhachHangUpdateRequest;
import com.cusc.toolbaogia.dto.baogiakhachhang.response.BaoGiaKhachHangResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.BaoGiaKhachHangService;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/baogiakhachhang")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoGiaKhachHangController {

    @Autowired
    private BaoGiaKhachHangService baoGiaKhachHangService;

    @GetMapping
    public ApiResponse<PageImpl<BaoGiaKhachHangResponse>> getAll(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<BaoGiaKhachHangResponse>>builder()
                .result(baoGiaKhachHangService
                        .getAll(page, size))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<BaoGiaKhachHangResponse> getById(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        } else {
            return ApiResponse.<BaoGiaKhachHangResponse>builder()
                    .result(baoGiaKhachHangService.getById(id))
                    .build();
        }
    }

    @PutMapping
    public ApiResponse<BaoGiaKhachHangResponse> put(@RequestBody @Valid BaoGiaKhachHangUpdateRequest entity) {
        return ApiResponse.<BaoGiaKhachHangResponse>builder()
                .result(baoGiaKhachHangService.update(entity))
                .build();
    }

    @PostMapping
    public ApiResponse<List<BaoGiaKhachHangResponse>> post(
            @RequestBody @Valid BaoGiaKhachHangCreateRequest entity) {
        ApiResponse<List<BaoGiaKhachHangResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(baoGiaKhachHangService.create(entity));
        return apiResponse;
    }

    @DeleteMapping
    public ApiResponse<BaoGiaKhachHangResponse> delete(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        baoGiaKhachHangService.delete(id);
        return ApiResponse.<BaoGiaKhachHangResponse>builder()
                .message("Báo giá khách hàng đã bị xóa")
                .build();
    }
}
