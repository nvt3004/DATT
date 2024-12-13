package com.cusc.toolbaogia.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data_db.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.cusc.toolbaogia.models.NhomChucNangTacNhan;

@Repository
public interface NhomChucNangTacNhanJPA extends JpaRepository<NhomChucNangTacNhan, Integer> {

    // @Query("SELECT c FROM ChucNang c WHERE c.ngayXoa IS NULL ORDER BY c.ngayTao DESC")
    Page<NhomChucNangTacNhan> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<NhomChucNangTacNhan> findByIdAndNgayXoaIsNull(int id);

    Optional<NhomChucNangTacNhan> findByNhomChucNang_Id(int nhomChucNangId);
}
