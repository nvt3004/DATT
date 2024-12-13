package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "phuongthuc_thanhtoan")
public class PhuongThucThanhToan {
    @Id
    @Column(name = "phuongthuc_thanhtoan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "phuongthuc_thanhtoan_ten")
    private String ten;

    @Column(name = "phuongthuc_thanhtoan_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "phuongThucThanhToan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("phuongThucThanhToan-baoGiaPhuongThucThanhToan")
    private List<BaoGiaPhuongThucThanhToan> listBaoGiaPhuongThucThanhToan;
}
