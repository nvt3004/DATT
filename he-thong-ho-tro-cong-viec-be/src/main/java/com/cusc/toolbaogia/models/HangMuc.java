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
@Table(name = "hangmuc")
public class HangMuc {
    @Id
    @Column(name = "hangmuc_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "hangmuc_ten")
    private String ten;

    @Column(name = "hangmuc_gia")
    private BigDecimal gia;

    @Column(name = "hangmuc_soluong")
    private int soLuong;

    @Column(name = "hangmuc_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;
    
    @ManyToOne
    @JoinColumn(name = "donvitinh_id")
    @JsonBackReference("donViTinh-listHangMuc")
    private DonViTinh donViTinh;

    @OneToMany(mappedBy = "hangMuc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("hangMuc-chucNangHangMuc")
    private List<ChucNangHangMuc> listChucNangHangMuc;

    @OneToMany(mappedBy = "hangMuc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("hangMuc-listNhomChucNang")
    private List<NhomChucNang> listNhomChucNang;

    @OneToMany(mappedBy = "hangMuc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("hangMuc-sanPhamHangMuc")
    private List<SanPhamHangMuc> listSanPhamHangMuc;

}
