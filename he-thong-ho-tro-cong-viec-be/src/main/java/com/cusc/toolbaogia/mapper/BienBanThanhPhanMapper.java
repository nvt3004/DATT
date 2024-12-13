package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.bienbanthanhphan.response.BienBanThanhPhanResponse;
import com.cusc.toolbaogia.models.BienBanThanhPhan;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BienBanThanhPhanMapper {
    BienBanThanhPhanResponse toBienBanThanhPhanResponse(BienBanThanhPhan bienBanThanhPhan);
}
