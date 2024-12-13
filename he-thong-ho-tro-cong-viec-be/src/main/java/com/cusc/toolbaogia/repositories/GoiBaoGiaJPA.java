package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.GoiBaoGia;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;


public interface GoiBaoGiaJPA extends JpaRepository<GoiBaoGia,Integer>{
    
    // @Query("SELECT g FROM GoiSanPham g WHERE g.ngayXoa IS NULL ORDER BY g.ngayTao DESC")
    // Page<GoiSanPham> findAllWithConditions(Pageable pageable);

    Page<GoiBaoGia> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<GoiBaoGia> findByIdAndNgayXoaIsNull(int id);

}
