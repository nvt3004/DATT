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
@Table(name = "thongso_group")
public class ThongSoGroup {
    @Id
    @Column(name = "thongso_group_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "thongso_group_ma")
    private String ma;

    @Column(name = "thongso_group_ten")
    private String ten;

    @Column(name = "thongso_group_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "thongSoGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thongSoGroup-sanPhamTSKT")
    private List<SanPhamTSKT> listSanPhamTSKT;

    @OneToMany(mappedBy = "thongSoGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("thongSoGroup-sanPhamMayChuChiTiet")
    private List<SanPhamMayChuChiTiet> listSanPhamMayChuChiTiet;

}
