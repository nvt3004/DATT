package com.cusc.toolbaogia.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheCreateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheUpdateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.response.KyThuatCongNgheResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTCreateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.response.SanPhamTSKTResponse;
import com.cusc.toolbaogia.models.KyThuatCongNghe;
import com.cusc.toolbaogia.models.SanPhamTSKT;

@Mapper(componentModel = "spring")
public interface KyThuatCongNgheMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    KyThuatCongNghe toKyThuatCongNghe(KyThuatCongNgheCreateRequest request);
    
    KyThuatCongNgheResponse toKyCongNgheResponse(KyThuatCongNghe kyThuatCongNghe);
    
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "sanPham.id", source = "sanPhamId")
    @Mapping(target = "baoGia.id", source = "baoGiaId")
    void updateKyThuatCongNghe(@MappingTarget KyThuatCongNghe kyThuatCongNghe,  KyThuatCongNgheUpdateRequest request);
}

