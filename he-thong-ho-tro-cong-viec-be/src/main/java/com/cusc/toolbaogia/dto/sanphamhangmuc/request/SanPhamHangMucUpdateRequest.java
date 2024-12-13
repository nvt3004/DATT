package com.cusc.toolbaogia.dto.sanphamhangmuc.request;

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
public class SanPhamHangMucUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer sanPhamId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer hangMucId;

}