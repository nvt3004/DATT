package com.cusc.toolbaogia.repositories;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.BaoGiaPhuongThucThanhToan;

@Repository
public interface BaoGiaPhuongThucTTJPA extends JpaRepository<BaoGiaPhuongThucThanhToan, Integer>{
    Page<BaoGiaPhuongThucThanhToan> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<BaoGiaPhuongThucThanhToan> findTopByBaoGiaIdOrderByNgayTaoDesc(Integer baoGiaId);

    Optional<BaoGiaPhuongThucThanhToan> findByIdAndNgayXoaIsNull(int id);

}
