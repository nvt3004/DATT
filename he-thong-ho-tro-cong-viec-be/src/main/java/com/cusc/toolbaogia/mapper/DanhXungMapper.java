package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.danhxung.request.DanhXungCreateRequest;
import com.cusc.toolbaogia.dto.danhxung.request.DanhXungUpdateRequest;
import com.cusc.toolbaogia.dto.danhxung.response.DanhXungResponse;
import com.cusc.toolbaogia.models.DanhXung;

@Mapper(componentModel = "spring")
public interface DanhXungMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listKhachHang", ignore = true)
    @Mapping(target = "listTuVan", ignore = true)
    DanhXung toDanhXung(DanhXungCreateRequest request);

    DanhXungResponse toDanhXungResponse(DanhXung danhXung);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listKhachHang", ignore = true)
    @Mapping(target = "listTuVan", ignore = true)
    void updateDanhXung(@MappingTarget DanhXung danhXung, DanhXungUpdateRequest request);
}
