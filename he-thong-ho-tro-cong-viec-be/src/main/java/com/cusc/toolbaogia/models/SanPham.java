package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

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
@Table(name = "sanpham")
public class SanPham {
    @Id
    @Column(name = "sanpham_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "sanpham_ten")
    private String ten;

    @Column(name = "sanpham_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "baohanh_id")
    @JsonBackReference("baoHanh-listSanPham")
    private BaoHanh baoHanh;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("sanpham-chucNangHangMuc")
    private List<ChucNangHangMuc> listChucNangHangMuc;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thongSoGroup-kyThuatCongNghe")
    private List<KyThuatCongNghe> listKyThuatCongNghe;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoGia-sanPhamBaoGia")
    private List<SanPhamBaoGia> listSanPhamBaoGia;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("sanPham-sanPhamHangMuc")
    private List<SanPhamHangMuc> listSanPhamHangMuc;
}
