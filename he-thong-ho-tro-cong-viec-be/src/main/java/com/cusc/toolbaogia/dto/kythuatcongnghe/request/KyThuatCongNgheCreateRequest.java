package com.cusc.toolbaogia.dto.kythuatcongnghe.request;

import com.fasterxml.jackson.annotation.JsonInclude;

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
public class KyThuatCongNgheCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String noiDung;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String giaTri;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamId;

}
