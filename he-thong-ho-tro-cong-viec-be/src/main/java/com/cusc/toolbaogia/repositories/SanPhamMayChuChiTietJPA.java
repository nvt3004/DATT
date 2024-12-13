package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.SanPhamMayChuChiTiet;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamMayChuChiTietJPA extends JpaRepository<SanPhamMayChuChiTiet, Integer>{
  Page<SanPhamMayChuChiTiet> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
  Optional<SanPhamMayChuChiTiet> findByIdAndNgayXoaIsNull(int id);

  List<SanPhamMayChuChiTiet> findByMayChu_Id(int mayChuId);

}
