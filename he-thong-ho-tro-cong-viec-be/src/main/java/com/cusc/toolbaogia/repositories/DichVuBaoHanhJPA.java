package com.cusc.toolbaogia.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cusc.toolbaogia.models.DichVuBaoHanh;
import com.cusc.toolbaogia.models.BaoHanh;

public interface DichVuBaoHanhJPA extends JpaRepository<DichVuBaoHanh, Integer> {
        Page<DichVuBaoHanh> findAllByNgayXoaIsNull(Pageable pageable);

        Page<DichVuBaoHanh> findAllByBaoHanhAndNgayXoaIsNullAndNoiDungContaining(BaoHanh baoHanh, String noiDung,
                        Pageable pageable);

        Page<DichVuBaoHanh> findAllByNgayXoaIsNullAndNoiDungContaining(String noiDung, Pageable pageable);

        Page<DichVuBaoHanh> findAllByBaoHanhAndNgayXoaIsNull(BaoHanh baoHanh, Pageable pageable);

        List<DichVuBaoHanh> findByBaoHanh_Id(int baoHanhId);
}
