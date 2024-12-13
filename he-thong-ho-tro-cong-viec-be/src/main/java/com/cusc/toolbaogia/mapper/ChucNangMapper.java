package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.chucnang.request.ChucNangCreateRequest;
import com.cusc.toolbaogia.dto.chucnang.request.ChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.chucnang.response.ChucNangResponse;
import com.cusc.toolbaogia.models.ChucNang;

@Mapper(componentModel = "spring")
public interface ChucNangMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    ChucNang toChucNang(ChucNangCreateRequest request);

    ChucNangResponse toChucNangResponse(ChucNang chucNang);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    void updateChucNang(@MappingTarget ChucNang chucNang, ChucNangUpdateRequest request);
}
