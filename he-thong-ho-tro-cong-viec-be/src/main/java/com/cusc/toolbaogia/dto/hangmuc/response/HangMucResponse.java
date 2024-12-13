package com.cusc.toolbaogia.dto.hangmuc.response;

import java.math.BigDecimal;
import java.util.List;

import com.cusc.toolbaogia.dto.donvitinh.response.DonViTinhResponse;
import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangForCNHMResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HangMucResponse {
    private int id;
    private String ten;
    private BigDecimal gia;
    private int soLuong;
    private String moTa;
    private DonViTinhResponse donViTinh;
    private List<NhomChucNangForCNHMResponse> listNhomChucNang;
}
