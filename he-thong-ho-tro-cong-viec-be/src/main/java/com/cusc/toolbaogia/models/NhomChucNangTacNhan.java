package com.cusc.toolbaogia.models;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nhomchucnang_tacnhan")
public class NhomChucNangTacNhan {
    @Id
    @Column(name = "nhomchucnang_tacnhan_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")
    private LocalDateTime ngayTao;

    @Column(name = "modified_at")
    private LocalDateTime ngaySua;

    @Column(name = "deleted_at")
    private LocalDateTime ngayXoa;
    
    @ManyToOne
    @JoinColumn(name = "nhomchucnang_id")
    @JsonBackReference("nhomChucNang-listNhomChucNangTacNhan")
    private NhomChucNang nhomChucNang;

    @ManyToOne
    @JoinColumn(name = "tacnhan_id")
    @JsonBackReference("tacNhan-listNhomChucNangTacNhan")
    private TacNhan tacNhan;

}
