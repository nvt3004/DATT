package com.cusc.toolbaogia.dto.chucnanghangmuc.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChucNangHangMucCreateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer hangMucId;
    private Integer nhomChucNangId;
    private List<Integer> chucNangId;
    // @NotNull(message = "FIELD_NOT_BLANK")
    // @DecimalMin(value = "1", message = "FIELD_MIN")
    // private BigDecimal gia;
}
