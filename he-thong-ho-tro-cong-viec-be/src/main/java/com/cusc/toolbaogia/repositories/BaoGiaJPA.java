package com.cusc.toolbaogia.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.BaoGia;

@Repository
public interface BaoGiaJPA extends JpaRepository<BaoGia, Integer> {
  @Query(value = "SELECT baogia_id,baogia_ngaytao,baogia_tieude,goisanpham_ten FROM toolbaogia.baogia A JOIN toolbaogia.goisanpham B ON A.goisanpham_id=B.goisanpham_id ORDER BY A.baogia_id DESC;", nativeQuery = true)
  List<Object[]> findAllBaoGia();

  @Query(value = "SELECT A.baogia_id, A.baogia_ngaytao, A.baogia_tieude, B.goisanpham_ten " +
      "FROM toolbaogia.baogia A " +
      "JOIN toolbaogia.goisanpham B ON A.goisanpham_id = B.goisanpham_id " +
      "WHERE " +
      "(:key IS NULL OR A.baogia_id IN ( " +
      "   SELECT B.baogia_id " +
      "   FROM toolbaogia.khachhang A " +
      "   JOIN toolbaogia.baogia_khachhang B ON A.khachhang_id = B.khachhang_id " +
      "    WHERE A.khachhang_ten LIKE CONCAT('%', :key, '%') " +
      "    ) " +
      "OR  A.baogia_tieude LIKE CONCAT('%', :key, '%')) " +
      "AND (:goisanpham_id IS NULL OR A.goisanpham_id = :goisanpham_id) " +
      "ORDER BY " +
      "	CASE WHEN :doituong = 'baogia_ngaytao' THEN A.baogia_ngaytao END, " +
      "    CASE WHEN :doituong = 'baogia_tieude' THEN A.baogia_tieude END, " +
      "    CASE WHEN :sortOrder = 'DESC' THEN A.baogia_ngaytao END ASC, " +
      "    CASE WHEN :sortOrder = 'DESC' THEN  A.baogia_ngaytao END DESC;", nativeQuery = true)
  List<Object[]> findAllByKeyAndGoiSPWithSort(@Param("key") String key,
      @Param("goisanpham_id") Integer goisanpham_id,
      @Param("doituong") String doituong, @Param("sortOrder") String sortOrder);

  // @Query("SELECT b FROM BaoGia b WHERE b.ngayXoa IS NULL ORDER BY b.ngayTao
  // DESC")
  // Page<BaoGia> findAllWithConditions(Pageable pageable);
  Page<BaoGia> findByNgayXoaIsNullOrderByNgayTaoDesc(Pageable pageable);

  Optional<BaoGia> findByIdAndNgayXoaIsNull(int id);
}
