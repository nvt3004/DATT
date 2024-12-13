package com.cusc.toolbaogia.dto.sanpham.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SanPhamResponse {
    private int id;
    private String ten;
    private String moTa;
    private BaoHanhResponse baoHanh;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}
