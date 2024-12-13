package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "thoigian")
public class ThoiGian {
    @Id
    @Column(name = "thoigian_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "thoigian_loai")
    private String loai;

    @Column(name = "thoigian_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "thoiGian", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thoiGian-baoGia")
    private List<BaoGia> listBaoGia;

    @OneToMany(mappedBy = "thoiGian", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thoiGian-BaoHanhBaoGia")
    private List<BaoHanhBaoGia> listBaoHanhBaoGia;

    @OneToMany(mappedBy = "thoiGian", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thoiGian-baoGiaPhuongThucThanhToan")
    private List<BaoGiaPhuongThucThanhToan> listBaoGiaPhuongThucThanhToan;

}
