package com.cusc.toolbaogia.dto.baogiakhachhang.response;

import com.cusc.toolbaogia.dto.baogia.response.BaoGiaResponse;
import com.cusc.toolbaogia.dto.khachhang.response.KhachHangResponse;

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
public class BaoGiaKhachHangResponse {
    private Integer id;
    private KhachHangResponse khachHang;
    private BaoGiaResponse baoGia;
}
