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
@Table(name = "sanpham_maychu")
public class SanPhamMayChu {
    @Id
    @Column(name = "sanpham_maychu_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "sanpham_baogia_id")
    @JsonBackReference("sanPhamBaoGia-listSanPhamMayChu")
    private SanPhamBaoGia sanPhamBaoGia;

    @ManyToOne
    @JoinColumn(name = "maychu_id")
    @JsonBackReference("mayChu-listSanPhamMayChu")
    private MayChu mayChu;
}
