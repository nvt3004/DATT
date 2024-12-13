package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.DonViTinh;

@Repository
public interface DonViTinhJPA extends JpaRepository<DonViTinh, Integer> {
    Page<DonViTinh> findAllByNgayXoaIsNull(Pageable pageable);

    Page<DonViTinh> findAllByNgayXoaIsNullAndTenContainingOrMoTaContaining(String ten, String moTa, Pageable pageable);

    Page<DonViTinh> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<DonViTinh> findByIdAndNgayXoaIsNull(int id);
}
