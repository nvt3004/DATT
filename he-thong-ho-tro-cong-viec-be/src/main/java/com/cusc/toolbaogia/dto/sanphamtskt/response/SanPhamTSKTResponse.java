package com.cusc.toolbaogia.dto.sanphamtskt.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.thongso.response.ThongSoResponse;
import com.cusc.toolbaogia.dto.thongsogroup.response.ThongSoGroupResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamTSKTResponse {
    private int id;
    private String giaTri;
    private ThongSoGroupResponse thongSoGroup;
    private ThongSoResponse thongSo;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}