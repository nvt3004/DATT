package com.cusc.toolbaogia.dto.chucnang.request;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChucNangCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    @DecimalMin(value = "1", message = "FIELD_MIN")
    private BigDecimal gia;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer nhomChucNangId;
}
