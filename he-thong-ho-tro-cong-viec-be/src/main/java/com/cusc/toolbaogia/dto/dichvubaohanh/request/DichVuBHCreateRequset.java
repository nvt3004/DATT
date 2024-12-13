package com.cusc.toolbaogia.dto.dichvubaohanh.request;

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
public class DichVuBHCreateRequset {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String noiDung;
    @NotNull(message = "FIELD_NOT_BLANK")
    private Integer baoHanhId;
}
