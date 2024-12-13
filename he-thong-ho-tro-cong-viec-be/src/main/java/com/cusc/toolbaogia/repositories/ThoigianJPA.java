package com.cusc.toolbaogia.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.ThoiGian;
import java.util.Optional;

@Repository
public interface ThoigianJPA extends JpaRepository<ThoiGian, Integer> {
  Page<ThoiGian> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
  Optional<ThoiGian> findByIdAndNgayXoaIsNull(int id);
}
