package com.cusc.toolbaogia.dto.chucnanghangmuc.request;

import java.math.BigDecimal;

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
public class ChucNangHangMucUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer hangMucId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer nhomChucNangId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer chucNangId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private BigDecimal gia;
}
