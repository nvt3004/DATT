package com.cusc.toolbaogia.dto.sanphammaychuchitiet.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamMCCTCreateRequest {
    private String giaTri;
    private Integer mayChuId;
    private Integer thongSoGroupId;
    private Integer thongSoId;
}
