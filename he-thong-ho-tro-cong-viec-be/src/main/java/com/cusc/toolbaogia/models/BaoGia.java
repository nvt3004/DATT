package com.cusc.toolbaogia.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "baogia")
public class BaoGia {
    @Id
    @Column(name = "baogia_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "baogia_tieude")
    private String tieuDe;

    @Column(name = "baogia_mocthoigian")
    private int mocThoiGian;

    @Column(name = "baogia_ngayhieuluc")
    private LocalDateTime ngayHieuLuc;

    @Column(name = "baogia_tongtien")
    private BigDecimal tongtien;

    @Column(name = "baogia_mota")
    private String moTa;

    @Column(name = "baogia_ngaytao")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "nguoidung_id")
    @JsonBackReference("nguoiDung-baoGia")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "thoigian_id")
    @JsonBackReference("thoiGian-baoGia")
    private ThoiGian thoiGian;

    @ManyToOne
    @JoinColumn(name = "goibaogia_id")
    @JsonBackReference("goiBaoGia-listBaoGia")
    private GoiBaoGia goiBaoGia;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listBaoGiaKhachHang")
    private List<BaoGiaKhachHang> listBaoGiaKhachHang;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listBaoGiaPhuongThucThanhToan")
    private List<BaoGiaPhuongThucThanhToan> listBaoGiaPhuongThucThanhToan;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listChucNangHangMuc")
    private List<ChucNangHangMuc> listChucNangHangMuc;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listSanPhamBaoGia")
    private List<SanPhamBaoGia> listSanPhamBaoGia;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listKyThuatCongNghe")
    private List<KyThuatCongNghe> listKyThuatCongNghe;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-listBaoHanhBaoGia")
    private List<BaoHanhBaoGia> listBaoHanhBaoGia;
}
