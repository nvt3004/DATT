package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;

import com.cusc.toolbaogia.dto.tuvanbaohanh.response.TuVanBaoHanhResponse;
import com.cusc.toolbaogia.models.TuVanBaoHanh;

@Mapper(componentModel = "spring")
public interface TuVanBaoHanhMapper {
    TuVanBaoHanhResponse toTuVanBaoHanhResponse(TuVanBaoHanh tuVanBaoHanh);

}