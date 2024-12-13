package com.cusc.toolbaogia.dto.chucnang.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangForChucNangResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChucNangResponse {
    private int id;
    private String ten;
    private String moTa;
    private BigDecimal gia;
    private NhomChucNangForChucNangResponse nhomChucNang;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}
