package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTCreateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTUpdateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.response.BaoGiaPhuongThucTTResponse;
import com.cusc.toolbaogia.models.BaoGiaPhuongThucThanhToan;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BaoGiaPhuongThucTTMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "thoiGian.id", source = "thoiGian")
    @Mapping(target = "baoGia.id", source = "baoGia")
    @Mapping(target = "phuongThucThanhToan.id", source = "phuongThucThanhToan")
    BaoGiaPhuongThucThanhToan toBaoGiaPhuongThucThanhToan(BaoGiaPhuongThucTTCreateRequest request);

    BaoGiaPhuongThucTTResponse toBaoGiaPhuongThucTTResponse(BaoGiaPhuongThucThanhToan baoGiaPhuongThucThanhToan);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "thoiGian.id", source = "thoiGian")
    @Mapping(target = "baoGia.id", source = "baoGia")
    @Mapping(target = "phuongThucThanhToan.id", source = "phuongThucThanhToan")
    void updateBaoGiaPhuongThucThanhToan(@MappingTarget BaoGiaPhuongThucThanhToan baoGiaPhuongThucThanhToan, BaoGiaPhuongThucTTUpdateRequest request);
}
