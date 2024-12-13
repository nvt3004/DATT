package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangResponse;
import com.cusc.toolbaogia.models.NhomChucNang;

@Mapper(componentModel = "spring")
public interface NhomChucNangMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNang", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listNhomChucNangTacNhan", ignore = true)
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    NhomChucNang toNhomChucNang(NhomChucNangCreateRequest request);

    NhomChucNangResponse toNhomChucNangResponse(NhomChucNang nhomChucNang);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNang", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listNhomChucNangTacNhan", ignore = true)
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    void updateNhomChucNang(@MappingTarget NhomChucNang nhomChucNang, NhomChucNangUpdateRequest request);
}
