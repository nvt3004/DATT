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
@Table(name = "chucnang")
public class ChucNang {
    @Id
    @Column(name = "chucnang_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "chucnang_ten")
    private String ten;

    @Column(name = "chucnang_mota")
    private String moTa;

    @Column(name = "chucnang_gia")
    private BigDecimal gia;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "nhomchucnang_id")
    @JsonBackReference("nhomChucNang-listChucNang")
    private NhomChucNang nhomChucNang;

    @OneToMany(mappedBy = "chucNang", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("chucNang-listChucNangHangMuc")
    private List<ChucNangHangMuc> listChucNangHangMuc;
}
