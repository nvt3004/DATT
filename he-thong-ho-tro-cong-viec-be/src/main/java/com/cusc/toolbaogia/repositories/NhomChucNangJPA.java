package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cusc.toolbaogia.models.NhomChucNang;

@Repository
public interface NhomChucNangJPA extends JpaRepository<NhomChucNang, Integer> {
    Page<NhomChucNang> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<NhomChucNang> findByIdAndNgayXoaIsNull(int id);

}
