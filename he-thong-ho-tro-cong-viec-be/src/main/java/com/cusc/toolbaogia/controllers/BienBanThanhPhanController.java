package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.bienbanthanhphan.request.BienBanThanhPhanRequest;

import com.cusc.toolbaogia.dto.bienbanthanhphan.response.BienBanThanhPhanResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.BienBanThanhPhanService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/bienbanthanhphan")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanThanhPhanController {
    BienBanThanhPhanService bienBanThanhPhanService;

    @GetMapping
    ApiResponse<PageImpl<BienBanThanhPhanResponse>> getAllBienBanThanhPhan(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        try{
            int adjustedPage = (page > 0) ? page -1 : 0;
            return ApiResponse.<PageImpl<BienBanThanhPhanResponse>>builder()
                    .result(bienBanThanhPhanService.getAllBienBanThanhPhan(adjustedPage,size))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/search")
    ApiResponse<BienBanThanhPhanResponse> getBienBanThanhPhan(@RequestParam int id) {
        return ApiResponse.<BienBanThanhPhanResponse>builder()
                .result(bienBanThanhPhanService.getBienBanThanhPhanById(id))
                .build();
    }

    @PostMapping
    ApiResponse<BienBanThanhPhanResponse> creatBienBanThanhPhan(@RequestBody @Valid BienBanThanhPhanRequest request){
        return ApiResponse.<BienBanThanhPhanResponse>builder()
                .result(bienBanThanhPhanService.createBienBanThanhPhan(request))
                .build();
    }

    @PutMapping()
    ApiResponse<BienBanThanhPhanResponse> updateBienBanThanhPhan(@RequestParam @Valid int id, @RequestBody BienBanThanhPhanRequest request){
        return ApiResponse.<BienBanThanhPhanResponse>builder()
                .result(bienBanThanhPhanService.updateBienBanThanhPhan(id,request))
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> deleteBienBanThanhPhan(@RequestParam int id) {
        bienBanThanhPhanService.deleteBienBanThanhPhan(id);
        return ApiResponse.builder()
                .message("Biên bản thành phần đã bị xóa.")
                .build();
    }
}
