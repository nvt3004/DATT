package com.cusc.toolbaogia.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;

import com.cusc.toolbaogia.models.TacNhan;

public interface TacNhanJPA extends JpaRepository<TacNhan, Integer>{
    Page<TacNhan> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
    Optional<TacNhan> findByIdAndNgayXoaIsNull(int id);

}
