package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.bienbanhop.request.BienBanHopRequest;
import com.cusc.toolbaogia.dto.bienbanhop.response.BienBanHopResponse;
import com.cusc.toolbaogia.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BienBanHopMapper {
    @Mapping(target = "nguoiDung", ignore = true)
    BienBanHop toBienBanHop(BienBanHopRequest bienBanHopRequest);
    BienBanHopResponse toBienBanHopResponse(BienBanHop bienBanHop);
    @Mapping(target = "nguoiDung", ignore = true)
    void upadteBienBanHop(@MappingTarget BienBanHop bienBanHop, BienBanHopRequest bienBanHopRequest);
}
