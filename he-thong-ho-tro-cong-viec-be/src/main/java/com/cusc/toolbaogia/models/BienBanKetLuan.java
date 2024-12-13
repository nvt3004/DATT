package com.cusc.toolbaogia.models;

import com.cusc.toolbaogia.utils.StringFieldTrimmer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bienban_ketluan")
public class BienBanKetLuan {
    @Id
    @Column(name = "bbketluan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bienbanhop_id")
    @JsonBackReference("bienBanHop-listBienBanKetLuan")  // Sử dụng JsonBackReference ở phía con
    private BienBanHop bienBanHop;

    @Column(name = "bbketluan_mota")
    private String mota;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @PrePersist
    @PreUpdate
    public void trimFields(){
        StringFieldTrimmer.trimAndNormalizeStringFields(this);
    }

}
