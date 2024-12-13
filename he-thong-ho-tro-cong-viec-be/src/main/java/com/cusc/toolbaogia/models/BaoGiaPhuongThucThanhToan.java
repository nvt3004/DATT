package com.cusc.toolbaogia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "baogia_phuongthucthanhtoan")
public class BaoGiaPhuongThucThanhToan {
    @Id
    @Column(name = "baogia_phuongthucthanhtoan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "baogia_phuongthucthanhtoan_giatri")
    private BigDecimal giaTri;

    @Column(name = "baogia_phuongthucthanhtoan_giatriconlai")
    private BigDecimal giaTriConLai;

    @Column(name = "baogia_phuongthucthanhtoan_mota")
    private String moTa;

    @Column(name = "baogia_phuongthucthanhtoan_lanthanhtoan")
    private Integer soLanThanhToan;

    @Column(name = "baogia_phuongthucthanhtoan_thoihan")
    private LocalDateTime thoihan;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "thoigian_id")
    @JsonBackReference("thoiGian-baoGiaPhuongThucThanhToan")
    private ThoiGian thoiGian;

    @ManyToOne
    @JoinColumn(name = "baogia_id")
    @JsonBackReference("baoGia-listBaoGiaPhuongThucThanhToan")
    private BaoGia baoGia;

    @ManyToOne
    @JoinColumn(name = "phuongthuc_thanhtoan_id")
    @JsonBackReference("phuongThucThanhToan-baoGiaPhuongThucThanhToan")
    private PhuongThucThanhToan phuongThucThanhToan;
}
