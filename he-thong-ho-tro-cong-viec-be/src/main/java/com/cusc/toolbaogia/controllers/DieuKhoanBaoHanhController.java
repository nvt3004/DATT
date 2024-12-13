package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.dieukhoan.request.DieuKhoanCreateResponse;
import com.cusc.toolbaogia.dto.dieukhoan.request.DieuKhoanUpdateResponse;
import com.cusc.toolbaogia.dto.dieukhoan.response.DieuKhoanResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.DieuKhoanDichVuService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/dieukhoanbaohanh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DieuKhoanBaoHanhController {
    @Autowired
    DieuKhoanDichVuService dieuKhoanDichVuService;

    @GetMapping
    public ApiResponse<PageImpl<DieuKhoanResponse>> getAllDieuKhoanApiResponse(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "idbaohanh", required = false) Integer idbaohanh) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<DieuKhoanResponse>>builder()
                .result(dieuKhoanDichVuService.getAllDieuKhoan(page, size, key, idbaohanh))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<DieuKhoanResponse> getDieuKhoApiResponse(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        return ApiResponse.<DieuKhoanResponse>builder()
                .result(dieuKhoanDichVuService.getDieuKhoan(id))
                .build();
    }

    @PostMapping
    public ApiResponse<DieuKhoanResponse> postDieuKhoan(@RequestBody @Valid DieuKhoanCreateResponse dieuKhoan) {
        return ApiResponse.<DieuKhoanResponse>builder()
                .result(dieuKhoanDichVuService.create(dieuKhoan))
                .build();
    }

    @PutMapping
    public ApiResponse<DieuKhoanResponse> putDichVu(
            @RequestBody @Valid DieuKhoanUpdateResponse dieuKhoan) {
        return ApiResponse.<DieuKhoanResponse>builder()
                .result(dieuKhoanDichVuService.update(dieuKhoan))
                .build();
    }

    @DeleteMapping
    public ApiResponse<DieuKhoanResponse> deleteDichVu(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        dieuKhoanDichVuService.delete(id);
        return ApiResponse.<DieuKhoanResponse>builder()
                .message("Điều khoản đã bị xóa")
                .build();
    }

}
