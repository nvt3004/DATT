package com.cusc.toolbaogia.dto.kythuatcongnghe.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.baogia.response.BaoGiaForCNHMResponse;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class KyThuatCongNgheResponse {
    private int id;
    private String noiDung;
    private String giaTri;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private BaoGiaForCNHMResponse baoGia;
    private SanPhamResponse sanPham;

}
