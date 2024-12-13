package com.cusc.toolbaogia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cusc.toolbaogia.models.DieuKhoanBaoHanh;

import java.util.List;
import com.cusc.toolbaogia.models.BaoHanh;

public interface DieuKhoanBaoHanhJPA extends JpaRepository<DieuKhoanBaoHanh, Integer> {
    List<DieuKhoanBaoHanh> findAllByBaoHanhAndNgayXoaIsNull(BaoHanh baoHanh);

    List<DieuKhoanBaoHanh> findAllByNgayXoaIsNull();

    List<DieuKhoanBaoHanh> findByBaoHanh_Id(int baoHanhId);
}
