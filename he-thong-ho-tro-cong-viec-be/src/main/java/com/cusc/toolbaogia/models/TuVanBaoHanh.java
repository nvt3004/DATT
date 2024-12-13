package com.cusc.toolbaogia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "tuvan_baohanh")
public class TuVanBaoHanh {
    @Id
    @Column(name = "tuvan_baohanh_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "baohanh_baogia_id")
    @JsonBackReference("baoHanhBaoGia-baoHanhBaoGia")
    private BaoHanhBaoGia baoHanhBaoGia;

    @ManyToOne
    @JoinColumn(name = "tuvan_id")
    @JsonBackReference("tuVan-listTuVanBaoHanh")
    private TuVan tuVan;
}
