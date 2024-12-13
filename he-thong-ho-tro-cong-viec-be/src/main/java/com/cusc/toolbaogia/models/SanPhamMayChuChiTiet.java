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
@Table(name = "sanpham_maychu_chitiet")
public class SanPhamMayChuChiTiet {
    @Id
    @Column(name = "sanpham_maychu_chitiet_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "sanpham_maychu_chitiet_giatri")
    private String giaTri;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "maychu_id")
    @JsonBackReference("mayChu-sanPhamMayChuChiTiet")
    private MayChu mayChu;

    @ManyToOne
    @JoinColumn(name = "thongso_group_id")
    @JsonBackReference("thongSoGroup-sanPhamMayChuChiTiet")
    private ThongSoGroup thongSoGroup;

    @ManyToOne
    @JoinColumn(name = "thongso_id")
    @JsonBackReference("thongSo-sanPhamMayChuChiTiet")
    private ThongSo thongSo;
}
