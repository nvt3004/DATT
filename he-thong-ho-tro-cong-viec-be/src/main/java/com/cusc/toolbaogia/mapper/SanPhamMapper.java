package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanpham.request.SanPhamCreateRequest;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamUpdateRequest;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamResponse;
import com.cusc.toolbaogia.models.SanPham;

@Mapper(componentModel = "spring")
public interface SanPhamMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamHangMuc", ignore = true)
    @Mapping(target = "listSanPhamBaoGia", ignore = true)
    @Mapping(target = "listKyThuatCongNghe", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "baoHanh.id", source = "baoHanhId")
    SanPham toSanPham(SanPhamCreateRequest request);

    SanPhamResponse toSanPhamResponse(SanPham sanPham);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamHangMuc", ignore = true)
    @Mapping(target = "listSanPhamBaoGia", ignore = true)
    @Mapping(target = "listKyThuatCongNghe", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "baoHanh.id", source = "baoHanhId")
    void updatePhanMem(@MappingTarget SanPham sanPham, SanPhamUpdateRequest request);
}
