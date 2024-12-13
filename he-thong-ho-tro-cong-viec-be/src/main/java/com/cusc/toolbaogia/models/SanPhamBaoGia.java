package com.cusc.toolbaogia.models;

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
@Table(name = "sanpham_baogia")
public class SanPhamBaoGia {
    @Id
    @Column(name = "sanpham_baogia_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "sanpham_id")
    @JsonBackReference("sanPham-sanPhamBaoGia")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "baogia_id")
    @JsonBackReference("baoGia-listSanPhamBaoGia")
    private BaoGia baoGia;

    @OneToMany(mappedBy = "sanPhamBaoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("sanPhamBaoGia-listSanPhamTSKT")
    private List<SanPhamTSKT> listSanPhamTSKT;

    @OneToMany(mappedBy = "sanPhamBaoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("sanPhamBaoGia-listSanPhamMayChu")
    private List<SanPhamMayChu> listSanPhamMayChu;
}
