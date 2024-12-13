package com.cusc.toolbaogia.mapper;

import com.cusc.toolbaogia.dto.baogia.request.BaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baogia.request.BaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baogia.response.BaoGiaResponse;
import com.cusc.toolbaogia.models.BaoGia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BaoGiaMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoHanhBaoGia", ignore = true)
    @Mapping(target = "listKyThuatCongNghe", ignore = true)
    @Mapping(target = "listSanPhamBaoGia", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listBaoGiaPhuongThucThanhToan", ignore = true)
    @Mapping(target = "listBaoGiaKhachHang", ignore = true)
    @Mapping(target = "nguoiDung.id", source = "nguoiDungId")
    @Mapping(target = "goiBaoGia.id", source = "goiSanPhamId")
    @Mapping(target = "thoiGian.id", source = "thoiGianId")
    BaoGia toBaoGia(BaoGiaCreateRequest request);

    BaoGiaResponse toBaoGiaResponse(BaoGia baoGia);

    @Mapping(target = "ngaySua", ignore = true)
    @Mapping(target = "ngayTao", ignore = true)
    @Mapping(target = "ngayXoa", ignore = true)
    @Mapping(target = "listBaoHanhBaoGia", ignore = true)
    @Mapping(target = "listKyThuatCongNghe", ignore = true)
    @Mapping(target = "listSanPhamBaoGia", ignore = true)
    @Mapping(target = "listChucNangHangMuc", ignore = true)
    @Mapping(target = "listBaoGiaPhuongThucThanhToan", ignore = true)
    @Mapping(target = "listBaoGiaKhachHang", ignore = true)
    @Mapping(target = "nguoiDung.id", source = "nguoiDungId")
    @Mapping(target = "goiBaoGia.id", source = "goiSanPhamId")
    @Mapping(target = "thoiGian.id", source = "thoiGianId")
    void updateBaoGia(@MappingTarget BaoGia baoGia, BaoGiaUpdateRequest request);
}
