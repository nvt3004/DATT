package com.cusc.toolbaogia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "baohanh_baogia")
public class BaoHanhBaoGia {
    @Id
    @Column(name = "baohanh_baogia_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "baohanh_baogia_thoigian")
    private int thoiGianBaoHanh;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "baohanh_id")
    @JsonBackReference("baoHanh-listBaoHanhBaoGia")
    private BaoHanh baoHanh;

    @ManyToOne
    @JoinColumn(name = "baogia_id")
    @JsonBackReference("baoGia-listBaoHanhBaoGia")
    private BaoGia baoGia;

    @ManyToOne
    @JoinColumn(name = "thoigian_id")
    @JsonBackReference("thoiGian-BaoHanhBaoGia")
    private ThoiGian thoiGian;

    @OneToMany(mappedBy = "baoHanhBaoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("baoHanhBaoGia-listTuVanBaoHanh")
    private List<TuVanBaoHanh> listTuVanBaoHanh;
}
