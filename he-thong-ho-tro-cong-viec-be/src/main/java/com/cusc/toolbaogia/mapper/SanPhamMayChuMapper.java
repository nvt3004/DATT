package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.response.SanPhamMayChuResponse;
import com.cusc.toolbaogia.models.SanPhamMayChu;

@Mapper(componentModel = "spring")
public interface SanPhamMayChuMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "mayChu.id", source = "mayChuId")
    @Mapping(target = "sanPhamBaoGia.id", source = "sanPhamBaoGiaId")
    SanPhamMayChu toSanPhamMayChu(SanPhamMayChuCreateRequest request);

    SanPhamMayChuResponse toSanPhamMayChuResponse(SanPhamMayChu sanPhamMayChu);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "mayChu.id", source = "mayChuId")
    @Mapping(target = "sanPhamBaoGia.id", source = "sanPhamBaoGiaId")
    void updateSanPhamMayChu(@MappingTarget SanPhamMayChu sanPhamMayChu,  SanPhamMayChuUpdateRequest request);
}

