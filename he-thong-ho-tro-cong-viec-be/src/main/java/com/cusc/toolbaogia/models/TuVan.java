package com.cusc.toolbaogia.models;

import java.util.List;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tuvan")
public class TuVan {
    @Id
    @Column(name = "tuvan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "tuvan_ten")
    private String ten;

    @Column(name = "tuvan_sdt")
    private String soDienThoai;

    @Column(name = "tuvan_email")
    private String email;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @ManyToOne
    @JoinColumn(name = "danhxung_id")
    @JsonBackReference("danhXung-listTuVan")
    private DanhXung danhXung;

    @OneToMany(mappedBy = "tuVan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("tuVan-listTuVanBaoHanh")
    private List<TuVanBaoHanh> listTuVanBaoHanh;
}
