package com.cusc.toolbaogia.dto.bienbanthanhphan.request;

import com.cusc.toolbaogia.validator.bienbanthanhphan.ValidNguoiDungInfo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ValidNguoiDungInfo()
public class BienBanThanhPhanRequest {

    private String ten;

    private String donvi;

    @Email(message = "EMAIL_NOT_VALID")
    private String email;

    @Min(value = 1, message = "FIELD_ID_NOT_VALID")
    private int bienBanHopId;

    @Min(value = 0, message = "FIELD_ID_NOT_VALID")
    private int nguoiDungId;
}
