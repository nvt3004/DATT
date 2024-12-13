package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhCreateRequest;
import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhUpdateRequest;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanh_ChiTietResponse;
import com.cusc.toolbaogia.models.BaoHanh;

@Mapper(componentModel = "spring")
public interface BaoHanhMapper {
    BaoHanhResponse tBaoHanh2Response(BaoHanh baoHanh);

    BaoHanh_ChiTietResponse tBaoHanh_ChiTietResponse(BaoHanh baoHanh);

    BaoHanh toBaoHanhCreate(BaoHanhCreateRequest baoHanh);

    void toBaoHanhUpdate(@MappingTarget BaoHanh baoHanh, BaoHanhUpdateRequest baoHanhUpdateRequest);

}
