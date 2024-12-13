package com.cusc.toolbaogia.controllers;

import java.util.List;

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
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.tuvanbaohanh.request.TuVanBaoHanhCreateRequest;
import com.cusc.toolbaogia.dto.tuvanbaohanh.request.TuVanBaoHanhUpdateRequest;
import com.cusc.toolbaogia.dto.tuvanbaohanh.response.TuVanBaoHanhResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.TuVanBaoHanhService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/tuvanbaohanh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TuVanBaoHanhController {

    @Autowired
    private TuVanBaoHanhService tuVanBaoHanhService;

    @GetMapping
    public ApiResponse<PageImpl<TuVanBaoHanhResponse>> getAll(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<TuVanBaoHanhResponse>>builder()
                .result(tuVanBaoHanhService
                        .getAll(page, size))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<TuVanBaoHanhResponse> getById(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        } else {
            return ApiResponse.<TuVanBaoHanhResponse>builder()
                    .result(tuVanBaoHanhService.getId(id))
                    .build();
        }
    }

    @PutMapping
    public ApiResponse<TuVanBaoHanhResponse> put(@RequestBody @Valid TuVanBaoHanhUpdateRequest entity) {
        return ApiResponse.<TuVanBaoHanhResponse>builder()
                .result(tuVanBaoHanhService.update(entity))
                .build();
    }

    @PostMapping
    public ApiResponse<List<TuVanBaoHanhResponse>> post(
            @RequestBody @Valid TuVanBaoHanhCreateRequest entity) {
        ApiResponse<List<TuVanBaoHanhResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(tuVanBaoHanhService.create(entity));
        return apiResponse;
    }

    @DeleteMapping
    public ApiResponse<TuVanBaoHanhResponse> delete(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        tuVanBaoHanhService.delete(id);
        return ApiResponse.<TuVanBaoHanhResponse>builder()
                .message("Tư vấn bảo hành đã bị xóa")
                .build();
    }
}
