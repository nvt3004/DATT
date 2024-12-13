package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.response.BaoHanhBaoGiaResponse;
import com.cusc.toolbaogia.models.BaoHanhBaoGia;

@Mapper(componentModel = "spring")
public interface BaoHanhBaoGiaMapper {
    BaoHanhBaoGiaResponse tBaoGiaResponse(BaoHanhBaoGia baoHanhBaoGia);

    @Mapping(target = "baoHanh", ignore = true)
    @Mapping(target = "baoGia", ignore = true)
    @Mapping(target = "thoiGian", ignore = true)
    BaoHanhBaoGia toBaoHanhBaoGiaCreate(BaoHanhBaoGiaCreateRequest baoGiaCreateRequest);

    @Mapping(target = "baoHanh", ignore = true)
    @Mapping(target = "baoGia", ignore = true)
    @Mapping(target = "thoiGian", ignore = true)
    void toBaoHanhBaoGiaUpdate(@MappingTarget BaoHanhBaoGia baoHanhBaoGia,
            BaoHanhBaoGiaUpdateRequest baoGiaUpdateRequest);
}
