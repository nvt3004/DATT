package com.cusc.toolbaogia.dto.baohanh.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaoHanhCreateRequest {
    @NotBlank(message = "FIELD_NOT_BLANK")
    private String moTa;
}
