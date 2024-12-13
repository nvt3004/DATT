package com.cusc.toolbaogia.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "maychu")
public class MayChu {
    @Id
    @Column(name = "maychu_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "maychu_ten")
    private String ten;

    @Column(name = "maychu_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "mayChu", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("mayChu-listSanPhamMayChu")
    private List<SanPhamMayChu> listSanPhamMayChu;

    @OneToMany(mappedBy = "mayChu", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("mayChu-sanPhamMayChuChiTiet")
    private List<SanPhamMayChuChiTiet> listSanPhamMayChuChiTiet;

}
