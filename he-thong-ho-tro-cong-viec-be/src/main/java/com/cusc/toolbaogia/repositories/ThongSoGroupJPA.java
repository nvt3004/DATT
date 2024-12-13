package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.ThongSoGroup;

@Repository
public interface ThongSoGroupJPA extends JpaRepository<ThongSoGroup, Integer>{
    // @Query("SELECT t FROM ThongSoGroup t WHERE t.ngayXoa IS NULL ORDER BY
    // t.ngayTao DESC")
    // Page<ThongSoGroup> findAllWithConditions(Pageable pageable);

    Page<ThongSoGroup> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<ThongSoGroup> findByIdAndNgayXoaIsNull(int id);
}
