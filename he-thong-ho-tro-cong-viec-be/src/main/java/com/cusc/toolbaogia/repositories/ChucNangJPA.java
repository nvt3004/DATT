package com.cusc.toolbaogia.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.cusc.toolbaogia.models.ChucNang;

@Repository
public interface ChucNangJPA extends JpaRepository<ChucNang, Integer> {
    Page<ChucNang> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<ChucNang> findByIdAndNgayXoaIsNull(int id);
}
