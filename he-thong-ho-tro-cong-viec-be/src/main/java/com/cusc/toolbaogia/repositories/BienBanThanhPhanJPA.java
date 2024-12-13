package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.BienBanThanhPhan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienBanThanhPhanJPA extends JpaRepository<BienBanThanhPhan, Integer> {

    Page<BienBanThanhPhan> findAllByNgayXoaIsNullOrderByIdDesc(Pageable pageable); // Lấy tất cả biên bản chưa bị xóa

    Optional<BienBanThanhPhan> findByIdAndNgayXoaIsNull(int id); // Lấy biên bản theo ID mà chưa bị xóa

}
