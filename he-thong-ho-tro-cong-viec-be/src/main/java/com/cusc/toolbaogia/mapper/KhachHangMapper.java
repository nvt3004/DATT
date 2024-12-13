package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.khachhang.request.KhachHangCreateRequest;
import com.cusc.toolbaogia.dto.khachhang.request.KhachHangUpdateRequest;
import com.cusc.toolbaogia.dto.khachhang.response.KhachHangResponse;
import com.cusc.toolbaogia.models.KhachHang;

@Mapper(componentModel = "spring")
public interface KhachHangMapper {
    KhachHangResponse toKhachHangResponse(KhachHang khachHang);

    @Mapping(target = "danhXung", ignore = true)
    KhachHang toKhachHangCreate(KhachHangCreateRequest khachHangCreateRequest);

    @Mapping(target = "danhXung", ignore = true)
    void toKhachHangUpdate(@MappingTarget KhachHang khachHang,KhachHangUpdateRequest khachHangUpdateRequest);
}
