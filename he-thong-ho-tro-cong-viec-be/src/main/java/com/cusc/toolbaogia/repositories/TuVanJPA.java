package com.cusc.toolbaogia.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cusc.toolbaogia.models.TuVan;
import com.cusc.toolbaogia.models.DanhXung;

@Repository
public interface TuVanJPA extends JpaRepository<TuVan, Integer> {
        Page<TuVan> findAllByNgayXoaIsNull(Pageable pageable);

        Page<TuVan> findAllByNgayXoaIsNullAndTenContainingOrEmailContainingOrSoDienThoaiContaining(String ten,
                        String email, String soDienThoai, Pageable pageable);

        Page<TuVan> findAllByNgayXoaIsNullAndDanhXungAndTenContainingOrEmailContainingOrSoDienThoaiContaining(
                        DanhXung danhXung, String ten, String email, String soDienThoai, Pageable pageable);

        Page<TuVan> findAllByNgayXoaIsNullAndDanhXung(DanhXung danhXung, Pageable pageable);
}
