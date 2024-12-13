package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cusc.toolbaogia.dto.dichvubaohanh.response.DichVuBHResponse;
import com.cusc.toolbaogia.models.DichVuBaoHanh;

@Mapper(componentModel = "spring")
public interface DichVuBaoHanhMapper {

    @Mapping(target = "baoHanh", ignore = true)
    DichVuBHResponse toBhResponseNotBaohanh(DichVuBaoHanh dichVuBaoHanh);

    DichVuBHResponse toBhResponse(DichVuBaoHanh dichVuBaoHanh);
    
}
