package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHCreateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHUpdateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.response.PhuongThucBaoHanhResponse;
import com.cusc.toolbaogia.models.PhuongThucBaoHanh;

@Mapper(componentModel = "spring")
public interface PhuongThucBHMapper {
    PhuongThucBaoHanhResponse toPhuongThucBaoHanhResponse(PhuongThucBaoHanh phuongThucBaoHanh);

    @Mapping(target = "baoHanh", ignore = true)
    PhuongThucBaoHanh toPhuongThucBaoHanhCreate(PhuongThucBHCreateRequest phuongThucBHCreateRequest);

    @Mapping(target = "baoHanh", ignore = true)
    void toPhuongThucBaoHanhUpdate(@MappingTarget PhuongThucBaoHanh phuongThucBaoHanh,
            PhuongThucBHUpdateRequest phuongThucBHUpdateRequest);
}