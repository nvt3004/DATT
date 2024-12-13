package com.cusc.toolbaogia.dto.chucnanghangmuc.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.chucnang.response.ChucNangForCNHMResponse;
import com.cusc.toolbaogia.dto.hangmuc.response.HangMucForCNHMResponse;
import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangForCNHMResponse;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamForCNHMResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChucNangHangMucResponse {
    private Integer id;
    private BigDecimal gia;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private SanPhamForCNHMResponse sanPham;
    private HangMucForCNHMResponse hangMuc;
    private NhomChucNangForCNHMResponse nhomChucNang;
    private ChucNangForCNHMResponse chucNang;
     
}
