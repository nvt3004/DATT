package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.maychu.request.MayChuCreateRequest;
import com.cusc.toolbaogia.dto.maychu.request.MayChuUpdateRequest;
import com.cusc.toolbaogia.dto.maychu.response.MayChuResponse;
import com.cusc.toolbaogia.models.MayChu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MayChuMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    @Mapping(target = "listSanPhamMayChu", ignore = true)
    MayChu toMayChu(MayChuCreateRequest request);

    MayChuResponse toMayChuResponse(MayChu mayChu);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    @Mapping(target = "listSanPhamMayChu", ignore = true)
    void updateMayChu(@MappingTarget MayChu mayChu, MayChuUpdateRequest request);
}
