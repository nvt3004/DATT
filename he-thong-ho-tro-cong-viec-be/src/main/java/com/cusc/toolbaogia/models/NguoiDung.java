package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

import com.cusc.toolbaogia.utils.StringFieldTrimmer;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nguoidung")
public class NguoiDung {
    @Id
    @Column(name = "nguoidung_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nguoidung_dangnhap")
    private String dangnhap;

    @Column(name = "nguoidung_matkhau")
    private String matkhau;

    @Column(name = "nguoidung_hoten")
    private String ten;

    @Column(name = "nguoidung_donvi")
    private String donvi;

    @Column(name = "nguoidung_anh")
    private String anh;

    @Column(name = "nguoidung_sdt")
    private String sdt;

    @Column(name = "nguoidung_diachi")
    private String diaChi;

    @Column(name = "nguoidung_sofax")
    private String soFax;

    @Column(name = "nguoidung_email")
    private String email;

    @Column(name = "nguoidung_mota")
    private String mota;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nguoiDung-baoGia")
    private List<BaoGia> listBaoGia;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nguoiDung-bienBanHop")
    private List<BienBanHop> listBienBanHop;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("nguoiDung-bienBanHop")
    private List<BienBanThanhPhan> listBienBanThanhPhan;

    @PrePersist
    @PreUpdate
    public void trimFields(){
        StringFieldTrimmer.trimAndNormalizeStringFields(this);
    }
}
