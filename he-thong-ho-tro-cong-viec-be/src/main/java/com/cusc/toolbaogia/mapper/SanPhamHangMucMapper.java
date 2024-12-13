package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucCreateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.response.SanPhamHangMucResponse;
import com.cusc.toolbaogia.models.SanPhamHangMuc;

@Mapper(componentModel = "spring")
public interface SanPhamHangMucMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    SanPhamHangMuc toSanPhamHangMuc(SanPhamHangMucCreateRequest request);

    SanPhamHangMucResponse toSanPhamHangMucResponse(SanPhamHangMuc sanPhamHangMuc);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "hangMuc.id", source = "hangMucId")
    void updateSanPhamHangMuc(@MappingTarget SanPhamHangMuc sanPhamHangMuc,  SanPhamHangMucUpdateRequest request);
}

