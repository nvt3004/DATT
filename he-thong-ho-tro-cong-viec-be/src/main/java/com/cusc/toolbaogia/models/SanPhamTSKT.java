package com.cusc.toolbaogia.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sanpham_tskt")
public class SanPhamTSKT {
    @Id
    @Column(name = "sanpham_tskt_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "sanpham_tskt_giatri")
    private String giaTri;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "sanpham_baogia_id")
    @JsonBackReference("sanPhamBaoGia-listSanPhamTSKT")
    private SanPhamBaoGia sanPhamBaoGia;

    @ManyToOne
    @JoinColumn(name = "thongso_group_id")
    @JsonBackReference("thongSoGroup-sanPhamTSKT")
    private ThongSoGroup thongSoGroup;

    @ManyToOne
    @JoinColumn(name = "thongso_id")
    @JsonBackReference("thongSo-sanPhamTSKT")
    private ThongSo thongSo;
}
