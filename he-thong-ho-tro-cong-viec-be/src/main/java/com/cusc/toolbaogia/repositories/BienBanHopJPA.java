package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.BienBanHop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienBanHopJPA extends JpaRepository<BienBanHop, Integer> {
    Page<BienBanHop> findAllByNgayXoaIsNullOrderByIdDesc(Pageable pageable);

    Optional<BienBanHop> findByIdAndNgayXoaIsNull(int id); 
}
