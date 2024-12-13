package com.cusc.toolbaogia.dto.baogiaphuongthuctt.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
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
public class BaoGiaPhuongThucTTCreateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    @DecimalMin(value = "1", message = "FIELD_MIN")
    private BigDecimal giaTri;
    @NotNull(message = "FIELD_NOT_BLANK")
    @DecimalMin(value = "1", message = "FIELD_MIN")
    private BigDecimal giaTriConLai;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Min(value = 1, message = "FIELD_MIN")
    private Integer soLanThanhToan;
    @NotNull(message = "FIELD_NOT_BLANK")
    @Future(message = "FIELD_FUTURE")
    private LocalDateTime thoiHan;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGia;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer phuongThucThanhToan;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thoiGian;
}
