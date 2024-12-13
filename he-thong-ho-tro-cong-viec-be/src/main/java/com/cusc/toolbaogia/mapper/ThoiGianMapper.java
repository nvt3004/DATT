package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianCreateRequest;
import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianUpdateRequest;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.cusc.toolbaogia.models.ThoiGian;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ThoiGianMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoGia", ignore = true)
    @Mapping(target = "listBaoGiaPhuongThucThanhToan", ignore = true)
    @Mapping(target = "listBaoHanhBaoGia", ignore = true)
    ThoiGian toThoiGian(ThoiGianCreateRequest request);
    
    ThoiGianResponse toThoiGianResponse(ThoiGian thoiGian);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoGia", ignore = true)
    @Mapping(target = "listBaoGiaPhuongThucThanhToan", ignore = true)
    @Mapping(target = "listBaoHanhBaoGia", ignore = true)
    void updateThoiGian(@MappingTarget ThoiGian thoiGian, ThoiGianUpdateRequest request);
}
