package com.cusc.toolbaogia.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.response.BaoHanhBaoGiaResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.BaoHanhBaoGiaService;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/baohanhbaogia")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoHanhBaoGiaController {
    @Autowired
    private BaoHanhBaoGiaService baoHanhBaoGiaService;

    @GetMapping
    public ApiResponse<PageImpl<BaoHanhBaoGiaResponse>> getAll(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<BaoHanhBaoGiaResponse>>builder()
                .result(baoHanhBaoGiaService
                        .getAll(page, size))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<BaoHanhBaoGiaResponse> getById(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        } else {
            return ApiResponse.<BaoHanhBaoGiaResponse>builder()
                    .result(baoHanhBaoGiaService.getId(id))
                    .build();
        }
    }

    @PutMapping
    public ApiResponse<BaoHanhBaoGiaResponse> put(@RequestBody @Valid BaoHanhBaoGiaUpdateRequest entity) {
        return ApiResponse.<BaoHanhBaoGiaResponse>builder()
                .result(baoHanhBaoGiaService.update(entity))
                .build();
    }

    @PostMapping
    public ApiResponse<BaoHanhBaoGiaResponse> post(
            @RequestBody @Valid BaoHanhBaoGiaCreateRequest entity) {
        ApiResponse<BaoHanhBaoGiaResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(baoHanhBaoGiaService.create(entity));
        return apiResponse;
    }

    @DeleteMapping
    public ApiResponse<BaoHanhBaoGiaResponse> delete(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        baoHanhBaoGiaService.delete(id);
        return ApiResponse.<BaoHanhBaoGiaResponse>builder()
                .message("Bảo hành báo giá đã bị xóa")
                .build();
    }
}
