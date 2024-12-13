package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.TuVanBaoHanh;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuVanBaoHanhJPA extends JpaRepository<TuVanBaoHanh, Integer> {
  Page<TuVanBaoHanh> findAllByNgayXoaIsNull(Pageable pageable);

  List<TuVanBaoHanh> findByBaoHanhBaoGia_Id(int baoHanhBaoGiaId);
}
