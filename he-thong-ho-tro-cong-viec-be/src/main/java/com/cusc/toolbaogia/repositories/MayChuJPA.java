package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.MayChu;

@Repository
public interface MayChuJPA extends JpaRepository<MayChu, Integer>{
    Page<MayChu> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<MayChu> findByIdAndNgayXoaIsNull(int id);
}