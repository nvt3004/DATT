package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.DanhXung;

@Repository
public interface DanhXungJPA extends JpaRepository<DanhXung, Integer> {
    DanhXung findByTenIgnoreCase(String ten);

    Page<DanhXung> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<DanhXung> findByIdAndNgayXoaIsNull(int id);

}
