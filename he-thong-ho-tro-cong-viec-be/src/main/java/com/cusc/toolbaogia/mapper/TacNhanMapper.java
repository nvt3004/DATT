package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanCreateRequest;
import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.tacnhan.response.TacNhanResponse;
import com.cusc.toolbaogia.models.TacNhan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TacNhanMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listNhomChucNangTacNhan", ignore = true)
    TacNhan toTacNhan(TacNhanCreateRequest request);

    TacNhanResponse toTacNhanResponse(TacNhan tacNhan);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listNhomChucNangTacNhan", ignore = true)
    void updateTacNhan(@MappingTarget TacNhan tacNhan, TacNhanUpdateRequest request);
}
