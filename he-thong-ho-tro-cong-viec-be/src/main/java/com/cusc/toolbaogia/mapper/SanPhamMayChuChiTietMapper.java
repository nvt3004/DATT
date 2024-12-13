package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.response.SanPhamMCCTResponse;
import com.cusc.toolbaogia.models.SanPhamMayChuChiTiet;

@Mapper(componentModel = "spring")
public interface SanPhamMayChuChiTietMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "mayChu.id", source = "mayChuId")
    @Mapping(target = "thongSoGroup.id", source = "thongSoGroupId")
    @Mapping(target = "thongSo.id", source = "thongSoId")
    SanPhamMayChuChiTiet toSanPhamMayChuChiTiet(SanPhamMCCTCreateRequest request);

    SanPhamMCCTResponse toSanPhamMayChuChiTietResponse(SanPhamMayChuChiTiet sanPhamMayChuChiTiet);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "mayChu.id", source = "mayChuId")
    @Mapping(target = "thongSoGroup.id", source = "thongSoGroupId")
    @Mapping(target = "thongSo.id", source = "thongSoId")
    void updateSanPhamMayChuChiTiet(@MappingTarget SanPhamMayChuChiTiet sanPhamMayChuChiTiet,  SanPhamMCCTUpdateRequest request);
}

