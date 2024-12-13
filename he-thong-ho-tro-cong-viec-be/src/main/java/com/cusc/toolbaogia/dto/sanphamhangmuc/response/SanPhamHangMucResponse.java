package com.cusc.toolbaogia.dto.sanphamhangmuc.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.hangmuc.response.HangMucForCNHMResponse;
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
public class SanPhamHangMucResponse {
    private int id;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private SanPhamForCNHMResponse sanPham;
    private HangMucForCNHMResponse hangMuc;

}
