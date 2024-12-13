package com.cusc.toolbaogia.services;

import java.util.List;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.khachhang.request.KhachHangCreateRequest;
import com.cusc.toolbaogia.dto.khachhang.request.KhachHangUpdateRequest;
import com.cusc.toolbaogia.dto.khachhang.response.KhachHangResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.KhachHangMapper;

import com.cusc.toolbaogia.models.DanhXung;
import com.cusc.toolbaogia.models.KhachHang;
import com.cusc.toolbaogia.repositories.DanhXungJPA;
import com.cusc.toolbaogia.repositories.KhachHangJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KhachHangService {
    @Autowired
    KhachHangJPA khachHangJPA;
    @Autowired
    DanhXungJPA danhXungJPA;
    @Autowired
    KhachHangMapper khachHangMapper;

    public PageImpl<KhachHangResponse> getAllKhachHang(int page, int size, String key, Integer idDanhXung) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
        Page<KhachHang> pageKhachHang;
        DanhXung danhXung = new DanhXung();
        if (idDanhXung != null) {
            danhXung = danhXungJPA.findById(idDanhXung)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        }
        if (key == null) {
            if (idDanhXung != null) {
                pageKhachHang = khachHangJPA.findAllByDanhXung(danhXung, pageable);
            } else {
                pageKhachHang = khachHangJPA.findAllByNgayXoaIsNull(pageable);
            }
        } else {
            if (idDanhXung != null) {
                pageKhachHang = khachHangJPA.findAllByNgayXoaIsNullAndDanhXungAndTenContainingOrMoTaContaining(danhXung,
                        key, key, pageable);
            } else {
                pageKhachHang = khachHangJPA.findAllByNgayXoaIsNullAndTenContainingOrMoTaContaining(key, key, pageable);
            }
        }
        List<KhachHangResponse> list = pageKhachHang.stream()
                .map(khachhang -> khachHangMapper.toKhachHangResponse(khachhang))
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, pageKhachHang.getTotalElements());
    }

    public KhachHangResponse getKhachHang(Integer id) {
        KhachHang entity = khachHangJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Khách hàng"));
        return khachHangMapper.toKhachHangResponse(entity);
    }

    public KhachHangResponse create(KhachHangCreateRequest khachHang) {
        KhachHang entity = khachHangMapper.toKhachHangCreate(khachHang);
        DanhXung danhXung = danhXungJPA.findById(khachHang.getDanhXung())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        entity.setDanhXung(danhXung);
        entity.setNgayTao(LocalDateTime.now());
        return khachHangMapper.toKhachHangResponse(khachHangJPA.save(entity));
    }

    public KhachHangResponse update(KhachHangUpdateRequest khachHang) {
        KhachHang entity = khachHangJPA.findById(khachHang.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Khách hàng"));
        DanhXung danhXung = danhXungJPA.findById(khachHang.getDanhXung())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        khachHangMapper.toKhachHangUpdate(entity, khachHang);
        entity.setDanhXung(danhXung);
        entity.setNgaySua(LocalDateTime.now());
        // entity.setMoTa(khachHang.getMoTa());
        // entity.setTen(khachHang.getTen());
        return khachHangMapper.toKhachHangResponse(khachHangJPA.save(entity));
    }

    public void delete(Integer id) {
        KhachHang entity = khachHangJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Khách hàng"));
        entity.setNgayXoa(LocalDateTime.now());
        khachHangJPA.save(entity);
    }
}
