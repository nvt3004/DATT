package com.cusc.toolbaogia.dto.dieukhoan.request;

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
public class DieuKhoanCreateResponse {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String noiDung;
    private String moTa;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoHanhId;
}
