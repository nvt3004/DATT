package com.cusc.toolbaogia.repositories;

import com.cusc.toolbaogia.models.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NguoiDungJPA extends JpaRepository<NguoiDung, Integer> {
    // Các phương thức truy vấn tùy chỉnh có thể được thêm vào đây nếu cần
    boolean existsNguoiDungByDangnhap(String dangnhap);
    Optional<NguoiDung> findNguoiDungByDangnhap(String dangnhap);
    boolean existsById(int id);
}
