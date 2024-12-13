package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.response.SanPhamBaoGiaResponse;
import com.cusc.toolbaogia.models.SanPhamBaoGia;

@Mapper(componentModel = "spring")
public interface SanPhamBaoGiaMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamMayChu", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    SanPhamBaoGia toSanPhamBaoGia(SanPhamBaoGiaCreateRequest request);

    SanPhamBaoGiaResponse toSanPhamBaoGiaResponse(SanPhamBaoGia sanPhamBaoGia);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamMayChu", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    void updateSanPhamBaoGia(@MappingTarget SanPhamBaoGia sanPhamBaoGia,  SanPhamBaoGiaUpdateRequest request);
}

