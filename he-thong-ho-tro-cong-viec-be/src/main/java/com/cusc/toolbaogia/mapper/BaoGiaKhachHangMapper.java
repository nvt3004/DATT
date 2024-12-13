package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;

import com.cusc.toolbaogia.dto.baogiakhachhang.response.BaoGiaKhachHangResponse;
import com.cusc.toolbaogia.models.BaoGiaKhachHang;

@Mapper(componentModel = "spring")
public interface BaoGiaKhachHangMapper {
    BaoGiaKhachHangResponse tBaoGiaResponse(BaoGiaKhachHang baoGiaKhachHang);
}
