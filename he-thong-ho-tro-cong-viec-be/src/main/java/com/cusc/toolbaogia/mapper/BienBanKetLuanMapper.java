package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanCreateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.request.BienBanKetLuanUpdateRequest;
import com.cusc.toolbaogia.dto.bienbanketluan.response.BienBanKetLuanResponse;
import com.cusc.toolbaogia.models.BienBanKetLuan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BienBanKetLuanMapper {
    @Mapping(target = "bienBanHop", ignore = true)
    BienBanKetLuan toBienBanKetLuan(BienBanKetLuanCreateRequest bienBanKetLuanCreateRequest);

    BienBanKetLuanResponse toBienBanKetLuanResponse(BienBanKetLuan bienBanKetLuan);

    @Mapping(target = "bienBanHop", ignore = true)
    void upadteBienBanKetLuan(@MappingTarget BienBanKetLuan bienBanKetLuan, BienBanKetLuanUpdateRequest bienBanKetLuanUpdateRequest);
}
