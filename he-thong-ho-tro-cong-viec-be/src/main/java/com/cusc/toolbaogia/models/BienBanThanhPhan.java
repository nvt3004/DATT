package com.cusc.toolbaogia.models;

import com.cusc.toolbaogia.utils.StringFieldTrimmer;
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
@Table(name = "bienban_thanhphan")
public class BienBanThanhPhan {
    @Id
    @Column(name = "bbthanhphan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bienbanhop_id")
    @JsonBackReference("bienBanHop-listBienBanThanhPhan")
    private BienBanHop bienBanHop;

    @Column(name = "bbthanhphan_ten")
    private String ten;

    @Column(name = "bbthanhphan_donvi")
    private String donvi;

    @Column(name = "bbthanhphan_email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "nguoidung_id")
    @JsonBackReference("nguoiDung-bienBanThanhPhan")
    private NguoiDung nguoiDung;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "bienBanThanhPhan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("bienBanThanhPhan-listBienBanNoiDung")
    private List<BienBanNoiDung> listBienBanNoiDung;

    @PrePersist
    @PreUpdate
    public void trimFields(){
        StringFieldTrimmer.trimAndNormalizeStringFields(this);
    }
}
