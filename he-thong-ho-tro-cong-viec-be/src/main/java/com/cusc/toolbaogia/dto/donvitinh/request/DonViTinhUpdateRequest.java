package com.cusc.toolbaogia.dto.donvitinh.request;

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
public class DonViTinhUpdateRequest {
    @NotNull(message = "ID_NOT_NULL")
    private Integer id;
    @NotBlank(message = "TEN_NOT_BLANK")
    private String ten;
    private String moTa;
}