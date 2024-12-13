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
@Table(name = "donvitinh")
public class DonViTinh {
    @Id
    @Column(name = "donvitinh_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "donvitinh_ten")
    private String ten;

    @Column(name = "donvitinh_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "donViTinh", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("donViTinh-listHangMuc")
    private List<HangMuc> listHangMuc;
}
