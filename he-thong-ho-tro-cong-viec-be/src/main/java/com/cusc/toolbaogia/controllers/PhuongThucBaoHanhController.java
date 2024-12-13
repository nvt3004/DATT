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

import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHCreateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHUpdateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.response.PhuongThucBaoHanhResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.services.PhuongThucBaoHanhService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/cusc-quote/v1/phuongthucbaohanh")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PhuongThucBaoHanhController {
        @Autowired
        PhuongThucBaoHanhService phuongthucService;

        @GetMapping
        public ApiResponse<PageImpl<PhuongThucBaoHanhResponse>> getAllPhuongThuc(
                        @RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "size", defaultValue = "5") int size,
                        @RequestParam(value = "key", required = false) String key,
                        @RequestParam(value = "idbaohanh", required = false) Integer idbaohanh) {
                if (page < 1 || size < 1) {
                        throw new AppException(ErrorCode.PAGE_NUMBER_INVALID);
                }
                PageImpl<PhuongThucBaoHanhResponse> map = phuongthucService.getAllPhuongThuc(page, size, key,
                                idbaohanh);
                return ApiResponse.<PageImpl<PhuongThucBaoHanhResponse>>builder()
                                .result(map)
                                .build();
        }

        @GetMapping("/id")
        public ApiResponse<PhuongThucBaoHanhResponse> getPhuongThuc(
                        @RequestParam(value = "id", required = false) Integer id) {
                if (id == null) {
                        throw new AppException(ErrorCode.ID_NOT_NULL);
                }
                return ApiResponse.<PhuongThucBaoHanhResponse>builder()
                                .result(phuongthucService.getPhuongThuc(id))
                                .build();
        }

        @PostMapping
        public ApiResponse<PhuongThucBaoHanhResponse> postPhuongThucBaoHanh(
                        @Valid @RequestBody PhuongThucBHCreateRequest entity) {
                PhuongThucBaoHanhResponse phuongThucBaoHanhResponse = phuongthucService.savePhuongThuc(entity);
                return ApiResponse.<PhuongThucBaoHanhResponse>builder()
                                .result(phuongThucBaoHanhResponse)
                                .build();
        }

        @PutMapping
        public ApiResponse<PhuongThucBaoHanhResponse> putPhuongThucBaoHanh(
                        @Valid @RequestBody PhuongThucBHUpdateRequest entity) {
                PhuongThucBaoHanhResponse phuongThucBaoHanhResponse = phuongthucService.putPhuongThuc(entity);
                return ApiResponse.<PhuongThucBaoHanhResponse>builder()
                                .result(phuongThucBaoHanhResponse)
                                .build();
        }

        @DeleteMapping
        public ApiResponse<PhuongThucBaoHanhResponse> deletePhuongThucBaoHanh(
                        @RequestParam(value = "id", required = false) Integer id) {
                if (id == null) {
                        throw new AppException(ErrorCode.ID_NOT_NULL);
                }
                phuongthucService.deletePhuongThuc(id);
                return ApiResponse.<PhuongThucBaoHanhResponse>builder()
                                .message("Phương thức bảo hành xóa thành công")
                                .build();
        }
}
