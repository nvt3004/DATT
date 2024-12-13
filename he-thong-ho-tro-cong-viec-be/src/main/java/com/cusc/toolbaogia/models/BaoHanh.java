package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "baohanh")
public class BaoHanh {
    @Id
    @Column(name = "baohanh_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "baohanh_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "baoHanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanh-listDichVuBaoHanh")
    private List<DichVuBaoHanh> listDichVuBaoHanh;

    @OneToMany(mappedBy = "baoHanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanh-listDieuKhoanBaoHanh")
    private List<DieuKhoanBaoHanh> listDieuKhoanBaoHanh;

    @OneToMany(mappedBy = "baoHanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanh-listPhuongThucBaoHanh")
    private List<PhuongThucBaoHanh> listPhuongThucBaoHanh;

    @OneToMany(mappedBy = "baoHanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanh-listSanPham")
    private List<SanPham> listSanPham;

    @OneToMany(mappedBy = "baoHanh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanh-listBaoHanhBaoGia")
    private List<BaoHanhBaoGia> listBaoHanhBaoGia;
}
