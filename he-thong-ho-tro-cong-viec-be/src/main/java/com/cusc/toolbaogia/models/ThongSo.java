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
@Table(name = "thongso")
public class ThongSo {
    @Id
    @Column(name = "thongso_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "thongso_ma")
    private String ma;

    @Column(name = "thongso_ten")
    private String ten;

    @Column(name = "thongso_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "thongSo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thongSo-sanPhamTSKT")
    private List<SanPhamTSKT> listSanPhamTSKT;

    @OneToMany(mappedBy = "thongSo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thongSo-sanPhamMayChuChiTiet")
    private List<SanPhamMayChuChiTiet> listSanPhamMayChuChiTiet;

}
