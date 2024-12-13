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
@Table(name = "goibaogia")
public class GoiBaoGia {
    @Id
    @Column(name = "goibaogia_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "goibaogia_ten")
    private String ten;

    @Column(name = "goibaogia_mota")
    private String moTa;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;

    @OneToMany(mappedBy = "goiBaoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("goiBaoGia-listBaoGia")
    private List<BaoGia> listBaoGia;
}
