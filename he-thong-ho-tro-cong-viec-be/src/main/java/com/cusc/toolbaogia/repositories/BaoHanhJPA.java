package com.cusc.toolbaogia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cusc.toolbaogia.models.BaoHanh;

public interface BaoHanhJPA extends JpaRepository<BaoHanh, Integer> {
//        @Query("SELECT b FROM BaoHanh b WHERE (:baoHanhId IS NULL OR b.id = :baoHanhId) " +
//                        "AND (:nguoiDungId IS NULL OR b.nguoiDung.id = :nguoiDungId)")
//        Page<BaoHanh> findBaoHanhByCriteria(
//                        @Param("baoHanhId") Integer baoHanhId,
//                        @Param("nguoiDungId") Integer nguoiDungId,
//                        Pageable pageable);
//
//        Page<BaoHanh> findAllByNguoiDung(NguoiDung nguoiDung,Pageable pageable);
}
