package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.SanPhamBaoGia;

@Repository
public interface SanPhamBaoGiaJPA extends JpaRepository<SanPhamBaoGia, Integer> {
    Page<SanPhamBaoGia> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<SanPhamBaoGia> findByIdAndNgayXoaIsNull(int id);

    Optional<SanPhamBaoGia> findByBaoGia_Id(int baoGiaId);

}
