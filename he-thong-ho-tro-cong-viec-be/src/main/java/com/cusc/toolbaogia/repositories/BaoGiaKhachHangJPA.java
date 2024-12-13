package com.cusc.toolbaogia.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.BaoGiaKhachHang;

@Repository
public interface BaoGiaKhachHangJPA extends JpaRepository<BaoGiaKhachHang, Integer> {
    List<BaoGiaKhachHang> findByBaoGia_Id(int baoGiaId);

    Page<BaoGiaKhachHang> findAllByNgayXoaIsNull(Pageable pageable);
}

