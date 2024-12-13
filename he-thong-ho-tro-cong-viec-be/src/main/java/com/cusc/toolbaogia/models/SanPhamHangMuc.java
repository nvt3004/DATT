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
@Table(name = "sanpham_hangmuc")
public class SanPhamHangMuc {
    @Id
    @Column(name = "sanpham_hangmuc")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;
    
    @ManyToOne
    @JoinColumn(name = "sanpham_id")
    @JsonBackReference("sanPham-sanPhamHangMuc")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "hangmuc_id")
    @JsonBackReference("hangMuc-sanPhamHangMuc")
    private HangMuc hangMuc;

}
