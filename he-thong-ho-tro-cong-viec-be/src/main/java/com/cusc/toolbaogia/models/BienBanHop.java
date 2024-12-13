package com.cusc.toolbaogia.models;

import com.cusc.toolbaogia.utils.StringFieldTrimmer;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "bienbanhop")
public class BienBanHop {
    @Id
    @Column(name = "bienbanhop_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "bienbanhop_ten")
    private String ten;

    @Column(name = "bienbanhop_diadiem")
    private String diadiem;

    @Column(name = "bienbanhop_giobatdau")
    private LocalDateTime giobatdau;

    @Column(name = "bienbanhop_gioketthuc")
    private LocalDateTime gioketthuc;

    @Column(name = "bienbanhop_mota")
    private String mota;

    @ManyToOne
    @JoinColumn(name = "nguoidung_id")
    @JsonBackReference("bienBanHop-bienBanThanhPhan")
    private NguoiDung nguoiDung;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "bienBanHop", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("bienBanHop-listBienBanThanhPhan")
    private List<BienBanThanhPhan> listBienBanThanhPhan;

    @OneToMany(mappedBy = "bienBanHop", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("bienBanHop-listBienBanKetLuan")
    private List<BienBanKetLuan> listBienBanKetLuan;

    @PrePersist
    @PreUpdate
    public void trimFields(){
        StringFieldTrimmer.trimAndNormalizeStringFields(this);
    }
}
