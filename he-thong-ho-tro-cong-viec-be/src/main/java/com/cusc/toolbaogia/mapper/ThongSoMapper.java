package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.thongso.request.ThongSoCreateRequest;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoUpdateRequest;
import com.cusc.toolbaogia.dto.thongso.response.ThongSoResponse;
import com.cusc.toolbaogia.models.ThongSo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ThongSoMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    ThongSo toThongSo(ThongSoCreateRequest request);
    
    ThongSoResponse toThongSoResponse(ThongSo thongSo);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listSanPhamTSKT", ignore = true)
    @Mapping(target = "listSanPhamMayChuChiTiet", ignore = true)
    void updateThongSo(@MappingTarget ThongSo thongSo, ThongSoUpdateRequest request);
}
