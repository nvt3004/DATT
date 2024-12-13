package com.cusc.toolbaogia.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cusc.toolbaogia.models.PhuongThucBaoHanh;
import com.cusc.toolbaogia.models.BaoHanh;

public interface PhuongThucBaoHanhJPA extends JpaRepository<PhuongThucBaoHanh, Integer> {
    Page<PhuongThucBaoHanh> findAllByNgayXoaIsNull(Pageable pageable);

    Page<PhuongThucBaoHanh> findAllByNgayXoaIsNullAndBaoHanh(BaoHanh baoHanh, Pageable pageable);

    Page<PhuongThucBaoHanh> findAllByNgayXoaIsNullAndBaoHanhAndNoiDungContainingOrMoTaContaining(
            BaoHanh baoHanh, String noiDung, String moTa, Pageable pageable);

    Page<PhuongThucBaoHanh> findAllByNgayXoaIsNullAndNoiDungContainingOrMoTaContaining(String noiDung,
            String moTa, Pageable pageable);

    List<PhuongThucBaoHanh> findByBaoHanh_Id(int baoHanhId);
}
