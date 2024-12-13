package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTCreateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.response.SanPhamTSKTResponse;
import com.cusc.toolbaogia.models.SanPhamTSKT;

@Mapper(componentModel = "spring")
public interface SanPhamTSKTMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "thongSoGroup.id", source = "thongSoGroupId")
    @Mapping(target = "thongSo.id", source = "thongSoId")
    @Mapping(target = "sanPhamBaoGia.id", source = "sanPhamBaoGiaId")
    SanPhamTSKT tosPhamTSKT(SanPhamTSKTCreateRequest request);
    
    SanPhamTSKTResponse toSanPhamTSKTResponse(SanPhamTSKT sanPhamTSKT);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "thongSoGroup.id", source = "thongSoGroupId")
    @Mapping(target = "thongSo.id", source = "thongSoId")
    @Mapping(target = "sanPhamBaoGia.id", source = "sanPhamBaoGiaId")
    void updateSanPhamTSKT(@MappingTarget SanPhamTSKT sanPhamTSKT,  SanPhamTSKTUpdateRequest request);
}

