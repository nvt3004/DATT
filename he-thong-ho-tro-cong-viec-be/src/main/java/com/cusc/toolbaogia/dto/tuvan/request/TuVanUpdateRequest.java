package com.cusc.toolbaogia.dto.tuvan.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class TuVanUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String ten;
    @Size(min = 10, max = 11, message = "SODIENTHOAI_INVALID")
    private String soDienThoai;
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String email;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer danhXungId;
}
