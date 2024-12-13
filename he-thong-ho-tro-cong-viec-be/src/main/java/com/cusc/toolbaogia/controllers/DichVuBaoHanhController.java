package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.dichvubaohanh.request.DichVuBHCreateRequset;
import com.cusc.toolbaogia.dto.dichvubaohanh.request.DichVuBHUpdateRequest;
import com.cusc.toolbaogia.dto.dichvubaohanh.response.DichVuBHResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.DichVuBaoHanhService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/cusc-quote/v1/dichvubaohanh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DichVuBaoHanhController {
    @Autowired
    DichVuBaoHanhService dichVuBaoHanhService;

    @GetMapping
    public ApiResponse<Page<DichVuBHResponse>> getAllDichVu(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "idbaohanh", required = false) Integer idbaohanh) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<Page<DichVuBHResponse>>builder()
                .result(dichVuBaoHanhService.getAllDichVu(page, size, key, idbaohanh))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<DichVuBHResponse> getDichVu(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        return ApiResponse.<DichVuBHResponse>builder()
                .result(dichVuBaoHanhService.getDichVu(id))
                .build();
    }

    @PostMapping
    public ApiResponse<DichVuBHResponse> postDichVu(@RequestBody @Valid DichVuBHCreateRequset dichVu) {
        return ApiResponse.<DichVuBHResponse>builder()
                .result(dichVuBaoHanhService.create(dichVu))
                .build();
    }

    @PutMapping
    public ApiResponse<DichVuBHResponse> putDichVu(
            @RequestBody @Valid DichVuBHUpdateRequest dichVu) {
        return ApiResponse.<DichVuBHResponse>builder()
                .result(dichVuBaoHanhService.update(dichVu))
                .build();
    }

    @DeleteMapping
    public ApiResponse<DichVuBHResponse> deleteDichVu(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        dichVuBaoHanhService.delete(id);
        return ApiResponse.<DichVuBHResponse>builder()
                .message("Dịch vụ đã bị xóa")
                .build();
    }

}
