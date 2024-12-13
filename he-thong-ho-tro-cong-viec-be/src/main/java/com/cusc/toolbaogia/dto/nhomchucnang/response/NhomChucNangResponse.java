package com.cusc.toolbaogia.dto.nhomchucnang.response;

import java.time.LocalDateTime;
import java.util.List;

import com.cusc.toolbaogia.dto.chucnang.response.ChucNangForNhomChucNangResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;
import com.cusc.toolbaogia.dto.hangmuc.response.HangMucResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NhomChucNangResponse {
    private int id;
    private String ten;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private HangMucResponse hangMuc;
    private List<ChucNangForNhomChucNangResponse> listChucNang;

}
