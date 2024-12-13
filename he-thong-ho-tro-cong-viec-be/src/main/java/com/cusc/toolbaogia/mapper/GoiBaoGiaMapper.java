package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.goibaogia.response.GoiBaoGiaResponse;
import com.cusc.toolbaogia.models.GoiBaoGia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GoiBaoGiaMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoGia", ignore = true)
    GoiBaoGia toGoiBaoGia(GoiBaoGiaCreateRequest request);
    
    GoiBaoGiaResponse toGoiBaoGiaResponse(GoiBaoGia goiBaoGia);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoGia", ignore = true)
    void updateGoiBaoGia(@MappingTarget GoiBaoGia goiBaoGia, GoiBaoGiaUpdateRequest request);
}
