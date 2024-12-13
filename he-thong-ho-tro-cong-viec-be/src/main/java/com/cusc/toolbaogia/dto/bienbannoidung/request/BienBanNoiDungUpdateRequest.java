package com.cusc.toolbaogia.dto.bienbannoidung.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BienBanNoiDungUpdateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    @Size(min = 1, max = 255, message = "FIELD_MAX")
    private String mota;
    @Min(value = 1, message = "FIELD_ID_NOT_VALID")
    private int bienBanThanhPhanId;
}
