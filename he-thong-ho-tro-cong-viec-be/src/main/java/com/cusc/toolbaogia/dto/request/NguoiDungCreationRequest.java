package com.cusc.toolbaogia.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NguoiDungCreationRequest {
    private String dangnhap;
    private String matkhau;
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
