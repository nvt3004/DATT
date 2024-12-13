package com.cusc.toolbaogia.dto.sanphambaogia.response;

import java.time.LocalDateTime;
import java.util.List;

import com.cusc.toolbaogia.dto.baogia.response.BaoGiaForCNHMResponse;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamResponse;
import com.cusc.toolbaogia.dto.sanphammaychu.response.SanPhamMayChuResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamBaoGiaResponse {
    private int id;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private BaoGiaForCNHMResponse baoGia;
    private SanPhamResponse sanPham;
    private List<SanPhamMayChuResponse> listSanPhamMayChu;

}
