package com.cusc.toolbaogia.dto.tuvanbaohanh.request;

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
public class TuVanBaoHanhUpdateRequest {
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer id;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoHanhBaoGiaId;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer tuVanId;
}
