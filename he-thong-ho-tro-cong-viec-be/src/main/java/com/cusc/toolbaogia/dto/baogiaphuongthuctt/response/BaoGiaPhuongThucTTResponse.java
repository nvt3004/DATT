package com.cusc.toolbaogia.dto.baogiaphuongthuctt.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.baogia.response.BaoGiaForCNHMResponse;
import com.cusc.toolbaogia.dto.response.PTThanhToanResponse;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaoGiaPhuongThucTTResponse {
    private int id;
    private BigDecimal giaTri;
    private BigDecimal giaTriConLai;
    private String moTa;
    private int soLanThanhToan;
    private LocalDateTime thoiHan;
    private BaoGiaForCNHMResponse baoGia;
    private PTThanhToanResponse phuongThucThanhToan;
    private ThoiGianResponse thoiGian;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
}
