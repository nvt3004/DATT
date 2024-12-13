package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.KyThuatCongNghe;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KyThuatCongNgheJPA extends JpaRepository<KyThuatCongNghe, Integer> {
    Page<KyThuatCongNghe> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<KyThuatCongNghe> findByIdAndNgayXoaIsNull(int id);

    List<KyThuatCongNghe> findByBaoGia_Id(int baoGiaId);

    List<KyThuatCongNghe> findByBaoGia_IdAndNgayXoaIsNull(int baoGiaId);
}
