package com.cusc.toolbaogia.dto.sanphamtskt.request;

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
public class SanPhamTSKTCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String giaTri;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamBaoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thongSoGroupId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thongSoId;

}
