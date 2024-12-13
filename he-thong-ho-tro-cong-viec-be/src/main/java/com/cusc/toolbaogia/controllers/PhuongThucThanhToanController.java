package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.request.PTThanhToanCreationRequest;
import com.cusc.toolbaogia.dto.request.PTThanhToanUpdateRequest;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.response.PTThanhToanResponse;
import com.cusc.toolbaogia.services.PTThanhToanService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/phuongthucthanhtoan")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PhuongThucThanhToanController {
    PTThanhToanService pTThanhToanService;

    @GetMapping
    ApiResponse<PageImpl<PTThanhToanResponse>> getAllPTThanhToan(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        try{
            int adjustedPage = (page > 0) ? page - 1 : 0;
            return ApiResponse.<PageImpl<PTThanhToanResponse>>builder()
                    .result(pTThanhToanService.getAllPTThanhToan(adjustedPage,size))
                    .message("Meetings fetched successfully")
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/search")
    ApiResponse<PTThanhToanResponse> getBienBanHop(@RequestParam int id) {
        return ApiResponse.<PTThanhToanResponse>builder()
                .result(pTThanhToanService.getPTThanhToanById(id))
                .build();
    }

    @PostMapping
    ApiResponse<PTThanhToanResponse> creatBienBanHop(@RequestBody PTThanhToanCreationRequest request){
        return ApiResponse.<PTThanhToanResponse>builder()
                .result(pTThanhToanService.createPTThanhToan(request))
                .build();
    }

    @PutMapping()
    ApiResponse<PTThanhToanResponse> updateBienBanHop(@RequestParam int id, @RequestBody PTThanhToanUpdateRequest request){
        return ApiResponse.<PTThanhToanResponse>builder()
                .result(pTThanhToanService.updatePTThanhToan(id,request))
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> deleteBienBanHop(@RequestParam int id) {
        pTThanhToanService.deleteBienBanHop(id);
        return ApiResponse.builder()
                .message("Biên bản họp đã bị xóa.")
                .build();
    }
}
