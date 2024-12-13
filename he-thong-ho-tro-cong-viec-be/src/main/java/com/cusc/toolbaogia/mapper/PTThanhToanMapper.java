package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.request.PTThanhToanCreationRequest;
import com.cusc.toolbaogia.dto.request.PTThanhToanUpdateRequest;
import com.cusc.toolbaogia.dto.response.PTThanhToanResponse;
import com.cusc.toolbaogia.models.PhuongThucThanhToan;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PTThanhToanMapper {
    PTThanhToanResponse toPTThanhToanResponse(PhuongThucThanhToan phuongThucThanhToan);

    PhuongThucThanhToan toPhuongThucThanhToan(PTThanhToanCreationRequest request);

    void updatePTThanhToan(@MappingTarget PhuongThucThanhToan phuongThucThanhToan, PTThanhToanUpdateRequest request);
}
