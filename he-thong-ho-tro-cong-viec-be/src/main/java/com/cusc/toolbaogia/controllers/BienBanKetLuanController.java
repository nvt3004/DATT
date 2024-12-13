package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanCreateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanUpdateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.response.BienBanKetLuanResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.BienBanKetLuanService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/bienbanketluan")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanKetLuanController {
    BienBanKetLuanService bienBanKetLuanService;

    @GetMapping
    ApiResponse<PageImpl<BienBanKetLuanResponse>> getAllBienBanKetLuan(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        try{
            int adjustedPage = (page > 0) ? page - 1 : 0;
            return ApiResponse.<PageImpl<BienBanKetLuanResponse>>builder()
                    .result(bienBanKetLuanService.getAllBienBanKetLuan(adjustedPage,size))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/search")
    ApiResponse<BienBanKetLuanResponse> getBienBanKetLuan(@RequestParam int id) {
        return ApiResponse.<BienBanKetLuanResponse>builder()
                .result(bienBanKetLuanService.getBienBanKetLuanById(id))
                .build();
    }

    @PostMapping
    ApiResponse<BienBanKetLuanResponse> creatBienBanKetLuan(@RequestBody @Valid BienBanKetLuanCreateRequest request){
        return ApiResponse.<BienBanKetLuanResponse>builder()
                .result(bienBanKetLuanService.createBienBanKetLuan(request))
                .build();
    }

    @PutMapping()
    ApiResponse<BienBanKetLuanResponse> updateBienBanKetLuan(@RequestParam @Valid int id, @RequestBody BienBanKetLuanUpdateRequest request){
        return ApiResponse.<BienBanKetLuanResponse>builder()
                .result(bienBanKetLuanService.updateBienBanKetLuan(id,request))
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> deleteBienBanKetLuan(@RequestParam int id) {
        bienBanKetLuanService.deleteBienBanKetLuan(id);
        return ApiResponse.builder()
                .message("Biên bản kết luận đã bị xóa.")
                .build();
    }
}
