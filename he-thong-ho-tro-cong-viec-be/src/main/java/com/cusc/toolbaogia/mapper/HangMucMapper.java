package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.hangmuc.request.HangMucCreateRequest;
import com.cusc.toolbaogia.dto.hangmuc.request.HangMucUpdateRequest;
import com.cusc.toolbaogia.dto.hangmuc.response.HangMucResponse;
import com.cusc.toolbaogia.models.HangMuc;

@Mapper(componentModel = "spring")
public interface HangMucMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listNhomChucNang", ignore = true)
    @Mapping(target = "listSanPhamHangMuc", ignore = true)
    @Mapping(target = "donViTinh.id", source = "donViTinhId")
    HangMuc toHangMucFromCreateRequest(HangMucCreateRequest hangMucCreateRequest);

    HangMucResponse toHangMucResponse(HangMuc hangMuc);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listNhomChucNang", ignore = true)
    @Mapping(target = "listSanPhamHangMuc", ignore = true)
    @Mapping(target = "donViTinh.id", source = "donViTinhId")
    void toHangMucFromUpdateRequest(@MappingTarget HangMuc hangMuc, HangMucUpdateRequest hangMucUpdateRequest);

}