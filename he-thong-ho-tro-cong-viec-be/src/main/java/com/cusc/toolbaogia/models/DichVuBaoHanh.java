package com.cusc.toolbaogia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dichvu_baohanh")
public class DichVuBaoHanh {
    @Id
    @Column(name = "dichvu_baohanh_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "dichvu_baohanh_noidung")
    private String noiDung;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "baohanh_id")
    @JsonBackReference("baoHanh-listDichVuBaoHanh")
    private BaoHanh baoHanh;

}
