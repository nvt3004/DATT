package com.cusc.toolbaogia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kythuat_congnghe")
public class KyThuatCongNghe {
    @Id
    @Column(name = "kythuat_congnghe_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "kythuat_congnghe_noidung")
    private String noiDung;

    @Column(name = "kythuat_congnghe_giatri")
    private String giaTri;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "baogia_id")
    @JsonBackReference("baoGia-listKyThuatCongNghe")
    private BaoGia baoGia;

    @ManyToOne
    @JoinColumn(name = "sanpham_id")
    @JsonBackReference("thongSoGroup-kyThuatCongNghe")
    private SanPham sanPham;

}
