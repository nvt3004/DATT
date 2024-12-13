package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.ThongSo;

@Repository
public interface ThongSoJPA extends JpaRepository<ThongSo, Integer>{
    // @Query("SELECT t FROM ThongSo t WHERE t.ngayXoa IS NULL ORDER BY t.ngayTao DESC")
    // Page<ThongSo> findAllWithConditions(Pageable pageable);

    Page<ThongSo> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<ThongSo> findByIdAndNgayXoaIsNull(int id);

}
