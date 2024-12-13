package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungCreateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.response.BienBanNoiDungResponse;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.services.BienBanNoiDungService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/bienbannoidung")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanNoiDungController {
    BienBanNoiDungService bienBanNoiDungService;

    @GetMapping
    ApiResponse<PageImpl<BienBanNoiDungResponse>> getAllBienBanNoiDung(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        try{
            int adjustedPage = (page > 0) ? page - 1 : 0;
            return ApiResponse.<PageImpl<BienBanNoiDungResponse>>builder()
                    .result(bienBanNoiDungService.getAllBienBanNoiDung(adjustedPage,size))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/search")
    ApiResponse<BienBanNoiDungResponse> getBienBanNoiDung(@RequestParam int id) {
        return ApiResponse.<BienBanNoiDungResponse>builder()
                .result(bienBanNoiDungService.getBienBanNoiDungById(id))
                .build();
    }

    @PostMapping
    ApiResponse<BienBanNoiDungResponse> creatBienBanNoiDung(@RequestBody @Valid BienBanNoiDungCreateRequest request){
        return ApiResponse.<BienBanNoiDungResponse>builder()
                .result(bienBanNoiDungService.createBienBanNoiDung(request))
                .build();
    }

    @PutMapping()
    ApiResponse<BienBanNoiDungResponse> updateBienBanNoiDung(@RequestParam @Valid int id, @RequestBody BienBanNoiDungUpdateRequest request){
        return ApiResponse.<BienBanNoiDungResponse>builder()
                .result(bienBanNoiDungService.updateBienBanNoiDung(id,request))
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> deleteBienBanNoiDung(@RequestParam int id) {
        bienBanNoiDungService.deleteBienBanNoiDung(id);
        return ApiResponse.builder()
                .message("Biên bản nội dung đã bị xóa.")
                .build();
    }
}
