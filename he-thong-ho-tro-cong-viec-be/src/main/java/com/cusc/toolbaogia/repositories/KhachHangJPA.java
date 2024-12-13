package com.cusc.toolbaogia.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.KhachHang;
import com.cusc.toolbaogia.models.DanhXung;

@Repository
public interface KhachHangJPA extends JpaRepository<KhachHang, Integer> {
    @Query(value = "SELECT A.* FROM toolbaogia.khachhang A JOIN toolbaogia.baogia_khachhang B ON A.khachhang_id = B.khachhang_id WHERE B.baogia_id = ?1", nativeQuery = true)
    List<KhachHang> findAllByBaoGia(Integer id);

    Page<KhachHang> findAllByNgayXoaIsNull(Pageable pageable);

    Page<KhachHang> findAllByDanhXung(DanhXung danhXung, Pageable pageable);

    Page<KhachHang> findAllByNgayXoaIsNullAndDanhXungAndTenContainingOrMoTaContaining(DanhXung danhXung, String ten,
            String moTa,
            Pageable pageable);

    Page<KhachHang> findAllByNgayXoaIsNullAndTenContainingOrMoTaContaining(String ten, String moTa,
            Pageable pageable);
}
