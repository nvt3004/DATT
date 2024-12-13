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
@Table(name = "danhxung")
public class DanhXung {
    @Id
    @Column(name = "danhxung_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "danhxung_ten")
    private String ten;

    @Column(name = "danhxung_mota")
    private String moTa;

    @Column(name = "danhxung_loai")
    private int loai;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "danhXung", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("danhXung-listKhachHang")
    private List<KhachHang> listKhachHang;

    @OneToMany(mappedBy = "danhXung", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("danhXung-listTuVan")
    private List<TuVan> listTuVan;

}

