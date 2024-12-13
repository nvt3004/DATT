package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucCreateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.request.ChucNangHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.chucnanghangmuc.response.ChucNangHangMucResponse;

import com.cusc.toolbaogia.models.ChucNangHangMuc;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ChucNangHangMucMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "gia", ignore = true)
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    @Mapping(target = "chucNang", ignore = true)
    ChucNangHangMuc toChucNangHangMuc(ChucNangHangMucCreateRequest request);

    ChucNangHangMucResponse toChucNangHangMucResponse(ChucNangHangMuc chucNangHangMuc);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    @Mapping(target = "nhomChucNang.id", source = "nhomChucNangId")
    @Mapping(target = "chucNang", ignore = true)
    void updateChucNangHangMuc(@MappingTarget ChucNangHangMuc chucNangHangMuc, ChucNangHangMucUpdateRequest request);


}
