package com.cusc.toolbaogia.models;

import java.math.BigDecimal;
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
@Table(name = "chucnang_hangmuc")
public class ChucNangHangMuc {
    @Id
    @Column(name = "chucnang_hangmuc_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "chucnang_hangmuc_gia")
    private BigDecimal gia;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "hangmuc_id")
    @JsonBackReference("hangMuc-chucNangHangMuc")
    private HangMuc hangMuc;

    @ManyToOne
    @JoinColumn(name = "chucnang_id")
    @JsonBackReference("chucNang-listChucNangHangMuc")
    private ChucNang chucNang;

    @ManyToOne
    @JoinColumn(name = "baogia_id")
    @JsonBackReference("baoGia-listChucNangHangMuc")
    private BaoGia baoGia;

    @ManyToOne
    @JoinColumn(name = "phanmem_id")
    @JsonBackReference("sanPham-chucNangHangMuc")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "nhomchucnang_id", nullable = true)
    @JsonBackReference("nhomChucNang-chucNangHangMuc")
    private NhomChucNang nhomChucNang;
}
