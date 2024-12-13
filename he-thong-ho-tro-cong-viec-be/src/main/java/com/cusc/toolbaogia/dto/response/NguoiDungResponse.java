package com.cusc.toolbaogia.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NguoiDungResponse {
    private int id;
    private String dangnhap;
    private String ten;
    private String donvi;
    private String anh;
    private String sdt;
    private String diaChi;
    private String soFax;
    private String email;
    private String mota;
    private String ngayTao;
    private String ngaySua;
    private String ngayXoa;
}
