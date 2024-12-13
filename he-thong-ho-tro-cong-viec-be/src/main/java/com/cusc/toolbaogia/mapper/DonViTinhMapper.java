package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhCreateRequest;
import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhUpdateRequest;
import com.cusc.toolbaogia.dto.donvitinh.response.DonViTinhResponse;
import com.cusc.toolbaogia.models.DonViTinh;

@Mapper(componentModel = "spring")
public interface DonViTinhMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listHangMuc", ignore = true)
    DonViTinh toDonViTinhCreate(DonViTinhCreateRequest donViTinhCreateRequest);

    DonViTinhResponse toDonViTinhResponse(DonViTinh donViTinh); 

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listHangMuc", ignore = true)
    DonViTinh toDonViTinhUpdate(@MappingTarget DonViTinh donViTinh ,DonViTinhUpdateRequest donViTinhCreateRequest);
}
