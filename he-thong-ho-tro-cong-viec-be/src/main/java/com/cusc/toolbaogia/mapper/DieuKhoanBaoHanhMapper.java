package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.dieukhoan.request.DieuKhoanUpdateResponse;
import com.cusc.toolbaogia.dto.dieukhoan.response.DieuKhoanResponse;
import com.cusc.toolbaogia.models.DieuKhoanBaoHanh;

@Mapper(componentModel = "spring")
public interface DieuKhoanBaoHanhMapper {

    @Mapping(target = "baoHanh", ignore = true)
    DieuKhoanResponse tKhoanResponseNotBaohanh(DieuKhoanBaoHanh dieuKhoanBaoHanh);

    DieuKhoanResponse toKhoanResponse(DieuKhoanBaoHanh dieuKhoanBaoHanh);

    @Mapping(target = "baoHanh", ignore = true)
    void toDieuKhoanUpdate(@MappingTarget DieuKhoanBaoHanh dieuKhoanBaoHanh,
            DieuKhoanUpdateResponse dieuKhoanUpdateResponse);
}
