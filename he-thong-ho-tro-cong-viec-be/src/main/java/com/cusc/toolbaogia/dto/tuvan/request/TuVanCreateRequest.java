package com.cusc.toolbaogia.dto.tuvan.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TuVanCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    private String soDienThoai;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String email;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer danhXungId;
}
