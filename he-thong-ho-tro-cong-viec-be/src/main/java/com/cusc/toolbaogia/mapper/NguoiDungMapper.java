package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.request.NguoiDungCreationRequest;
import com.cusc.toolbaogia.dto.request.NguoiDungUpdateRequest;
import com.cusc.toolbaogia.dto.response.NguoiDungResponse;
import com.cusc.toolbaogia.models.NguoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NguoiDungMapper {
    NguoiDung toUser(NguoiDungCreationRequest request);
    NguoiDungResponse toUserResponse(NguoiDung user);
    void upadteNguoiDung(@MappingTarget NguoiDung nguoidung, NguoiDungUpdateRequest request);
}
