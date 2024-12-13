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
@Table(name = "nhomchucnang")
public class NhomChucNang {
    @Id
    @Column(name = "nhomchucnang_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nhomchucnang_ten")
    private String ten;

    @Column(name = "nhomchucnang_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "hangmuc_id")
    @JsonBackReference("hangMuc-listNhomChucNang")
    private HangMuc hangMuc;

    @OneToMany(mappedBy = "nhomChucNang", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nhomChucNang-listChucNang")
    private List<ChucNang> listChucNang;

    @OneToMany(mappedBy = "nhomChucNang", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nhomChucNang-chucNangHangMuc")
    private List<ChucNangHangMuc> listChucNangHangMuc;

    @OneToMany(mappedBy = "nhomChucNang", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nhomChucNang-listNhomChucNangTacNhan")
    private List<NhomChucNangTacNhan> listNhomChucNangTacNhan;
}
