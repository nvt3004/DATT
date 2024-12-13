package com.cusc.toolbaogia.dto.baogiakhachhang.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaoGiaKhachHangCreateRequest {
    @NotEmpty(message = "FIELD_NOT_BLANK")
    private List<Integer> khachHang;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGiaId;

}
