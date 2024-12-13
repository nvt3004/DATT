package com.cusc.toolbaogia.dto.baohanhbaogia.request;

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
public class BaoHanhBaoGiaCreateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thoiGianBaoHanh;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoHanhId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer thoiGianId;
}
