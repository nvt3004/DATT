package com.cusc.toolbaogia.dto.maychu.response;

import java.time.LocalDateTime;
import java.util.List;

import com.cusc.toolbaogia.dto.sanphammaychuchitiet.response.SanPhamMCCTResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MayChuResponse {
    private int id;
    private String ten;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private List<SanPhamMCCTResponse> listSanPhamMayChuChiTiet;

}
