package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupCreateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupUpdateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.response.ThongSoGroupResponse;
import com.cusc.toolbaogia.models.ThongSoGroup;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ThongSoGroupMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    ThongSoGroup toThongSoGroup(ThongSoGroupCreateRequest request);

    ThongSoGroupResponse toThongSoGroupResponse(ThongSoGroup thongSoGroup);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    void updateThongSoGroup(@MappingTarget ThongSoGroup thongSoGroup, ThongSoGroupUpdateRequest request);
}
