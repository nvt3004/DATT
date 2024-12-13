package com.cusc.toolbaogia.repositories;
import com.cusc.toolbaogia.models.BaoHanhBaoGia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaoHanhBaoGiaJPA extends JpaRepository<BaoHanhBaoGia, Integer> {
    Page<BaoHanhBaoGia> findAllByNgayXoaIsNull(Pageable pageable);

    Optional<BaoHanhBaoGia> findByBaoGia_Id(int baoGiaId);
}
