package com.cusc.toolbaogia.dto.nguoidung.response;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class NguoiDungResponse {
    private int id;
    private String dangnhap;
    private String matkhau;
    private String ten;
    private String anh;
    private String sdt;
    private String diaChi;
    private String soFax;
    private String email;
    private String mota;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;

}
