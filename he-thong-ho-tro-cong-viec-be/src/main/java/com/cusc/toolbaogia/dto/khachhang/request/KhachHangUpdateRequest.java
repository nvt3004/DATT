package com.cusc.toolbaogia.dto.khachhang.request;

import jakarta.validation.constraints.NotBlank;
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
public class KhachHangUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer danhXung;
}
