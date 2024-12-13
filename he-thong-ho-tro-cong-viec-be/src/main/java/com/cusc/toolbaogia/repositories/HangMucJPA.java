package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.HangMuc;

@Repository
public interface HangMucJPA extends JpaRepository<HangMuc, Integer> {
    Page<HangMuc> findAllByNgayXoaIsNull(Pageable pageable);

    Page<HangMuc> findByNgayXoaIsNullAndTenContainingOrDonViTinh_TenContaining(String ten, String donViTinhTen,
            Pageable pageable);

    Optional<HangMuc> findByIdAndNgayXoaIsNull(int id);

}
