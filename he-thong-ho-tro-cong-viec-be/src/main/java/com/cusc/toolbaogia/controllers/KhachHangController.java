package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.khachhang.request.KhachHangCreateRequest;
import com.cusc.toolbaogia.dto.khachhang.request.KhachHangUpdateRequest;
import com.cusc.toolbaogia.dto.khachhang.response.KhachHangResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;

import com.cusc.toolbaogia.services.KhachHangService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/cusc-quote/v1/khachhang")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KhachHangController {
    @Autowired
    KhachHangService khachHangService;

    @GetMapping
    public ApiResponse<PageImpl<KhachHangResponse>> getAllKhachHang(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "idDanhXung", required = false) Integer idDanhXung) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<KhachHangResponse>>builder()
                .result(khachHangService.getAllKhachHang(page, size, key, idDanhXung))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<KhachHangResponse> getKhachHang(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        return ApiResponse.<KhachHangResponse>builder()
                .result(khachHangService.getKhachHang(id))
                .build();
    }

    @PostMapping
    public ApiResponse<KhachHangResponse> postKhachHang(@RequestBody @Valid KhachHangCreateRequest khachang) {
        return ApiResponse.<KhachHangResponse>builder()
                .result(khachHangService.create(khachang))
                .build();
    }

    @PutMapping
    public ApiResponse<KhachHangResponse> putKhachHang(@RequestBody @Valid KhachHangUpdateRequest khachang) {
        return ApiResponse.<KhachHangResponse>builder()
                .result(khachHangService.update(khachang))
                .build();
    }

    @DeleteMapping
    public ApiResponse<KhachHangResponse> deleteKhanhHang(@RequestParam Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        khachHangService.delete(id);
        return ApiResponse.<KhachHangResponse>builder()
                .message("Khách hàng xóa thành công")
                .build();
    }

}
