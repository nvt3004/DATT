package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.PhuongThucThanhToan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhuongThucThanhToanJPA extends JpaRepository<PhuongThucThanhToan, Integer> {
  Page<PhuongThucThanhToan> findAllByNgayXoaIsNull(Pageable pageable); // Lấy tất cả biên bản chưa bị xóa

  Optional<PhuongThucThanhToan> findByIdAndNgayXoaIsNull(int id); //

  Page<PhuongThucThanhToan> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
}
