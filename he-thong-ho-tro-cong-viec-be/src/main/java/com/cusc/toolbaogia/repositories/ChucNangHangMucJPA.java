package com.cusc.toolbaogia.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import com.cusc.toolbaogia.models.ChucNangHangMuc;

@Repository
public interface ChucNangHangMucJPA extends JpaRepository<ChucNangHangMuc, Integer> {

    List<ChucNangHangMuc> findByBaoGia_Id(int baoGiaId);

    List<ChucNangHangMuc> findBySanPham_Id(int phanMemId);

    List<ChucNangHangMuc> findByHangMuc_Id(int hangMucId);

    List<ChucNangHangMuc> findByNhomChucNang_Id(int nhomChucNangId);

    List<ChucNangHangMuc> findByChucNang_Id(int chucNangId);

//    @Query("SELECT cnm.chiTietBaoGia FROM ChucNangHangMuc cnm WHERE cnm.chiTietBaoGia.baoGia.id = :baoGiaId")
//    List<ChiTietBaoGia> findChiTietBaoGiaByBaoGiaId(@Param("baoGiaId") int baoGiaId);

//    @Query("SELECT cnm.hangMuc FROM ChucNangHangMuc cnm WHERE cnm.phanMem.id = :phanMemId")
//    List<HangMuc> findHangMucByPhanMemId(@Param("phanMemId") int phanMemId);

    // @Query("SELECT c FROM ChucNangHangMuc c WHERE c.ngayXoa IS NULL ORDER BY c.ngayTao DESC")
    // Page<ChucNangHangMuc> findAllWithConditions(Pageable pageable);

    Page<ChucNangHangMuc> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

    Optional<ChucNangHangMuc> findByIdAndNgayXoaIsNull(int id);

    List<ChucNangHangMuc> findByHangMuc_IdAndNgayXoaIsNullAndBaoGia_Id(int hangMucId, int baoGiaId);


}
