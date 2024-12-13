package com.cusc.toolbaogia.dto.baogia.response;

import java.time.LocalDateTime;

import com.cusc.toolbaogia.dto.goibaogia.response.GoiBaoGiaResponse;
import com.cusc.toolbaogia.dto.nguoidung.response.NguoiDungResponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaoGiaForNDBGResponse {
    private int id;
    private int mocThoiGian;
    private LocalDateTime ngayHieuLuc;
    private String tieuDe;
    private String moTa;
    private NguoiDungResponse nguoiDung;
    // private BaoHanhResponse baoHanh;
    private GoiBaoGiaResponse goiBaoGia;
}
