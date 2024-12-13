package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.bienbanhop.request.BienBanHopRequest;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.bienbanhop.response.BienBanHopResponse;
import com.cusc.toolbaogia.services.BienBanHopService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cusc-quote/v1/bienbanhop")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BienBanHopController {
    BienBanHopService bienBanHopService;

    @GetMapping
    ApiResponse<PageImpl<BienBanHopResponse>> getAllBienBanHop(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        try{
            int adjustedPage = (page > 0) ? page - 1 : 0;
            return ApiResponse.<PageImpl<BienBanHopResponse>>builder()
                    .result(bienBanHopService.getAllBienBanHop(adjustedPage,size))
                    .message("Meetings fetched successfully")
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/search")
    ApiResponse<BienBanHopResponse> getBienBanHop(@RequestParam int id) {
        return ApiResponse.<BienBanHopResponse>builder()
                .result(bienBanHopService.getBienBanHopById(id))
                .build();
    }

    @PostMapping
    ApiResponse<BienBanHopResponse> creatBienBanHop(@RequestBody @Valid BienBanHopRequest request){
        return ApiResponse.<BienBanHopResponse>builder()
                .result(bienBanHopService.createBienBanHop(request))
                .build();
    }

    @PutMapping()
    ApiResponse<BienBanHopResponse> updateBienBanHop(@RequestParam int id,@Valid @RequestBody BienBanHopRequest request){
        return ApiResponse.<BienBanHopResponse>builder()
                .result(bienBanHopService.updateBienBanHop(id,request))
                .build();
    }

    @DeleteMapping()
    ApiResponse<?> deleteBienBanHop(@RequestParam int id) {
        bienBanHopService.deleteBienBanHop(id);
        return ApiResponse.builder()
                .message("Biên bản họp đã bị xóa.")
                .build();
    }
}
