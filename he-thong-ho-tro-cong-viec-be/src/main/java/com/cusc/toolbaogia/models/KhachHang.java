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
@Table(name = "khachhang")
public class KhachHang {
    @Id
    @Column(name = "khachhang_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "khachhang_ten")
    private String ten;

    @Column(name = "khachhang_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "khachHang", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("khachHang-listBaoGiaKhachHang")
    private List<BaoGiaKhachHang> listBaoGiaKhachHang;

    @ManyToOne
    @JoinColumn(name = "danhxung_id")
    @JsonBackReference("danhXung-listKhachHang")
    private DanhXung danhXung;
}
