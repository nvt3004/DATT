package com.cusc.toolbaogia.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.tuvan.request.TuVanCreateRequest;
import com.cusc.toolbaogia.dto.tuvan.request.TuVanUpdateRequest;
import com.cusc.toolbaogia.dto.tuvan.response.TuVanResponse;
import com.cusc.toolbaogia.models.TuVan;

@Mapper(componentModel = "spring")
public interface TuVanMapper {
    TuVanResponse toTuVanResponse(TuVan tuVan);

    @Mapping(target = "danhXung", ignore = true)
    TuVan toTuVanCreate(TuVanCreateRequest tuVanCreateRequest);

    @Mapping(target = "danhXung",ignore = true)
    void toTuVanUpdate(@MappingTarget TuVan tuVan, TuVanUpdateRequest tuVanUpdateRequest);
}