package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungCreateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.request.BienBanNoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.bienbannoidung.response.BienBanNoiDungResponse;
import com.cusc.toolbaogia.models.BienBanNoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BienBanNoiDungMapper {
    @Mapping(target = "bienBanThanhPhan", ignore = true)
    BienBanNoiDung toBienBanNoiDung(BienBanNoiDungCreateRequest bienBanNoiDungCreateRequest);
    BienBanNoiDungResponse toBienBanNoiDungResponse(BienBanNoiDung bienBanNoiDung);
    @Mapping(target = "bienBanThanhPhan", ignore = true)
    void upadteBienBanNoiDung(@MappingTarget BienBanNoiDung bienBanNoiDung, BienBanNoiDungUpdateRequest bienBanNoiDungUpdateRequest);
}
