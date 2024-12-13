package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.response.NhomChucNangTacNhanResponse;
import com.cusc.toolbaogia.models.NhomChucNangTacNhan;

@Mapper(componentModel = "spring")
public interface NhomChucNangTacNhanMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    @Mapping(target = "tacNhan.id", source = "tacNhanId")
    NhomChucNangTacNhan toChucNangTacNhan(NhomChucNangTacNhanCreateRequest request);

    NhomChucNangTacNhanResponse toChucNangTacNhanResponse(NhomChucNangTacNhan chucNangTacNhan);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    @Mapping(target = "tacNhan.id", source = "tacNhanId")
    void updateChucNangTacNhan(@MappingTarget NhomChucNangTacNhan chucNangTacNhan, NhomChucNangTacNhanUpdateRequest request);
}
