package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.SanPhamMayChu;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamMayChuJPA extends JpaRepository<SanPhamMayChu, Integer>{
  Page<SanPhamMayChu> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
  Optional<SanPhamMayChu> findByIdAndNgayXoaIsNull(int id);

  List<SanPhamMayChu> findBySanPhamBaoGia_Id(int sanPhamBaoGiaId);

}
