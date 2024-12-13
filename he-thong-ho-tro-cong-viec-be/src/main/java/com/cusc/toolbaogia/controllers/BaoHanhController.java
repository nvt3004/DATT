package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhCreateRequest;
import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhUpdateRequest;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanh_ChiTietResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.BaoHanhService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/baohanh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoHanhController {
        @Autowired
        private BaoHanhService baoHanhService;

        @GetMapping("/id")
        public ApiResponse<BaoHanh_ChiTietResponse> getBaoHanhById(
                        @RequestParam(value = "baoHanhid", required = false) Integer baoHanhid) {
                if (baoHanhid == null) {
                        throw new AppException(ErrorCode.ID_NOT_NULL);
                } else {
                        return ApiResponse.<BaoHanh_ChiTietResponse>builder()
                                        .result(baoHanhService.getBaoHanh(baoHanhid))
                                        .build();
                }
        }

        @GetMapping
        public ApiResponse<PageImpl<BaoHanh_ChiTietResponse>> getAllBaoHanh(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size) {
                if (page < 1 || size < 1) {
                        throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
                }
                return ApiResponse.<PageImpl<BaoHanh_ChiTietResponse>>builder()
                                .result(baoHanhService
                                                .getAllBaoHanh(page, size))
                                .build();
        }

        @PutMapping
        public ApiResponse<BaoHanhResponse> putBaoHanh(@RequestBody @Valid BaoHanhUpdateRequest baoHanhUpdateRequest) {
                return ApiResponse.<BaoHanhResponse>builder()
                                .result(baoHanhService.putBaoHanh(baoHanhUpdateRequest))
                                .build();
        }

        @PostMapping
        public ApiResponse<BaoHanhResponse> postBaoHanh(
                        @RequestBody @Valid BaoHanhCreateRequest baoHanhAddDTO) {
                ApiResponse<BaoHanhResponse> apiResponse = new ApiResponse<>();
                apiResponse.setResult(baoHanhService.postBaoHanh(baoHanhAddDTO));
                return apiResponse;
        }

        @DeleteMapping
        public ApiResponse<BaoHanhResponse> deleteBaoHanh(@RequestParam(value = "id", required = false) Integer id) {
                if (id == null) {
                        throw new AppException(ErrorCode.ID_NOT_NULL);
                }
                baoHanhService.delete(id);
                return ApiResponse.<BaoHanhResponse>builder()
                                .message("Bảo hành đã bị xóa")
                                .build();
        }
}
