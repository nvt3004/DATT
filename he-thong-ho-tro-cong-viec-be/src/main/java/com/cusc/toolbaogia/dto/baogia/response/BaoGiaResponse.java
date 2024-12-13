package com.cusc.toolbaogia.dto.baogia.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cusc.toolbaogia.dto.baogiakhachhang.response.BaoGiaKhachHangNotBaoGiaResponse;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.response.BaoGiaPhuongThucTTResponse;
import com.cusc.toolbaogia.dto.baohanhbaogia.response.BaoHanhBaoGiaNotBaoGia;
import com.cusc.toolbaogia.dto.chucnanghangmuc.response.ChucNangHangMucResponse;
import com.cusc.toolbaogia.dto.goibaogia.response.GoiBaoGiaResponse;
import com.cusc.toolbaogia.dto.kythuatcongnghe.response.KyThuatCongNgheResponse;
import com.cusc.toolbaogia.dto.nguoidung.response.NguoiDungResponse;
import com.cusc.toolbaogia.dto.sanphambaogia.response.SanPhamBaoGiaResponse;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaoGiaResponse {
    private int id;
    private int mocThoiGian;
    private LocalDateTime ngayHieuLuc;
    private String tieuDe;
    private String moTa;
    private BigDecimal tongtien;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private LocalDateTime ngayXoa;
    private NguoiDungResponse nguoiDung;
    private GoiBaoGiaResponse goiBaoGia;
    private ThoiGianResponse thoiGian;
    private List<BaoGiaKhachHangNotBaoGiaResponse> listBaoGiaKhachHang;
    private List<BaoGiaPhuongThucTTResponse> listBaoGiaPhuongThucThanhToan;
    private List<ChucNangHangMucResponse> listChucNangHangMuc;
    private List<SanPhamBaoGiaResponse> listSanPhamBaoGia;
    private List<KyThuatCongNgheResponse> listKyThuatCongNghe;
    private List<BaoHanhBaoGiaNotBaoGia> listBaoHanhBaoGia;

    public List<KyThuatCongNgheResponse> getListKyThuatCongNghe() {
        if (listKyThuatCongNghe == null) {
            return List.of();
        }
        return listKyThuatCongNghe.stream()
                .filter(item -> item.getNgayXoa() == null)
                .toList();
    }

}
