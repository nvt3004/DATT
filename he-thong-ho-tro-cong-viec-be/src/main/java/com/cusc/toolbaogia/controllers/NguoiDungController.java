package com.cusc.toolbaogia.controllers;

import com.cusc.toolbaogia.dto.request.NguoiDungCreationRequest;
import com.cusc.toolbaogia.dto.request.NguoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.response.ApiResponse;
import com.cusc.toolbaogia.dto.response.NguoiDungResponse;
import com.cusc.toolbaogia.services.NguoiDungService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cusc-quote/v1/nguoidung")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NguoiDungController {
    private NguoiDungService nguoiDungService; // Khởi tạo userService bằng @Autowired

    @PostMapping
    ApiResponse<NguoiDungResponse> createUser(@RequestBody @Valid NguoiDungCreationRequest request) {
        ApiResponse<NguoiDungResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(nguoiDungService.createUser(request));
        return apiResponse;
    }

    @GetMapping
    List<NguoiDungResponse> getAllUsers() {
        return nguoiDungService.getAllUsers();
    }

    @GetMapping("/{nguoiDungId}")
    NguoiDungResponse getUserById(@PathVariable int nguoiDungId) {
        return nguoiDungService.getUser(nguoiDungId);
    }

    @PutMapping("/{nguoiDungId}")
    ApiResponse<NguoiDungResponse> updateUser(@PathVariable int nguoiDungId, @RequestBody @Valid NguoiDungUpdateRequest request) {
        ApiResponse<NguoiDungResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(nguoiDungService.updateUser(nguoiDungId, request));
        return apiResponse;
    }

    @DeleteMapping("/{nguoiDungId}")
    String updateUser(@PathVariable int nguoiDungId) {
        nguoiDungService.deleteNguoiDung(nguoiDungId);
        return "Người dùng đã bị xóa.";
    }

}
