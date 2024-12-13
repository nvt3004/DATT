package com.cusc.toolbaogia.dto.hangmuc.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
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
public class HangMucCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotNull(message = "FIELD_NOT_BLANK")
    @DecimalMin(value = "1", message = "FIELD_MIN")
    private BigDecimal gia;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Min(value = 1, message = "FIELD_MIN")
    private Integer soLuong;
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer donViTinhId;
}
