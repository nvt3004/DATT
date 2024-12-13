package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.BienBanKetLuan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienBanKetLuanJPA extends JpaRepository<BienBanKetLuan, Integer> {
    Page<BienBanKetLuan> findAllByNgayXoaIsNullOrderByIdDesc(Pageable pageable); // Lấy tất cả biên bản chưa bị xóa

    Optional<BienBanKetLuan> findByIdAndNgayXoaIsNull(int id); // Lấy biên bản theo ID mà chưa bị xóa
}
