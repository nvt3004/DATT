package com.cusc.toolbaogia.dto.hangmuc.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
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
public class HangMucUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotNull(message = "GIA_NOT_NULL")
    @Min(value = 1000,message = "GIA_INVALID")
    private BigDecimal gia;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Min(value = 1, message = "FIELD_MIN")
    private Integer soLuong;
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer donViTinhId;
}
