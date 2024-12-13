package com.cusc.toolbaogia.dto.bienbanhop.request;

import com.cusc.toolbaogia.validator.bienbanhop.ValidTimeRange;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ValidTimeRange(message = "TIME_RANGE_INVALID")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BienBanHopRequest {

    @NotBlank(message = "FIELD_NOT_BLANK")
    @Size(max = 255, message = "FIELD_MAX")
    private String ten;

    @NotBlank(message = "FIELD_NOT_BLANK")
    @Size(max = 255, message = "FIELD_MAX")
    private String diadiem;

    @NotNull(message = "FIELD_NOT_BLANK")
    @Future(message = "FIELD_FUTURE")
    private LocalDateTime giobatdau;

    @NotNull(message = "FIELD_NOT_BLANK")
    @Future(message = "FIELD_FUTURE")
    private LocalDateTime gioketthuc;

    @NotBlank(message = "FIELD_NOT_BLANK")
    @Size(max = 255, message = "FIELD_MAX")
    private String mota;

    @Min(value = 1, message = "FIELD_ID_NOT_VALID")
    private int nguoiDungId;
}
