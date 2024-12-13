package com.cusc.toolbaogia.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PTThanhToanCreationRequest {
    String ten;
    String moTa;
}
