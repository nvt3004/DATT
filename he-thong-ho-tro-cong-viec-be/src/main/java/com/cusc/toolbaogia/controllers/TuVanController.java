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

import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.tuvan.request.TuVanCreateRequest;
import com.cusc.toolbaogia.dto.tuvan.request.TuVanUpdateRequest;
import com.cusc.toolbaogia.dto.tuvan.response.TuVanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.TuVanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cusc-quote/v1/tuvan")
public class TuVanController {
    @Autowired
    private TuVanService tuVanService;

    @GetMapping
    public ApiResponse<PageImpl<TuVanResponse>> getAllTuVan(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            @RequestParam(value = "idDanhXung", required = false) Integer idDanhXung) {
        if (page < 1 || size < 1) {
            throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
        }
        return ApiResponse.<PageImpl<TuVanResponse>>builder()
                .result(tuVanService.getAllTuVan(page, size, search, idDanhXung))
                .build();
    }

    @GetMapping("/id")
    public ApiResponse<TuVanResponse> getTuVan(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        return ApiResponse.<TuVanResponse>builder()
                .result(tuVanService.getTuVan(id))
                .build();
    }

    @PostMapping
    public ApiResponse<TuVanResponse> postTuvan(@RequestBody @Valid TuVanCreateRequest tuVan) {
        return ApiResponse.<TuVanResponse>builder()
                .result(tuVanService.create(tuVan))
                .build();
    }

    @PutMapping
    public ApiResponse<TuVanResponse> putTuvan(@RequestBody @Valid TuVanUpdateRequest tuVan) {
        return ApiResponse.<TuVanResponse>builder()
                .result(tuVanService.update(tuVan))
                .build();
    }

    @DeleteMapping
    public ApiResponse<TuVanResponse> deleteTuvan(@RequestParam(value = "id", required = false) Integer id) {
        if (id == null) {
            throw new AppException(ErrorCode.ID_NOT_NULL);
        }
        tuVanService.delete(id);
        return ApiResponse.<TuVanResponse>builder()
                .message("Xóa tư vấn thành công")
                .build();
    }

}
