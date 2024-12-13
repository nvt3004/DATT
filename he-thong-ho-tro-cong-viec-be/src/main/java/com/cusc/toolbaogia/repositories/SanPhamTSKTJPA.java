package com.cusc.toolbaogia.repositories;
import java.util.Optional;

import com.cusc.toolbaogia.models.SanPhamTSKT;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamTSKTJPA extends JpaRepository<SanPhamTSKT, Integer> {
  Page<SanPhamTSKT> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);
  Optional<SanPhamTSKT> findByIdAndNgayXoaIsNull(int id);
}
