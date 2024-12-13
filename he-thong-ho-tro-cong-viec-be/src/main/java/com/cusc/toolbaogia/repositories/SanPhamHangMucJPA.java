package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.SanPhamHangMuc;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamHangMucJPA extends JpaRepository<SanPhamHangMuc, Integer> {
    Page<SanPhamHangMuc> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<SanPhamHangMuc> findByIdAndNgayXoaIsNull(int id);

    List<SanPhamHangMuc> findByHangMuc_Id(int hangMucId);
}
