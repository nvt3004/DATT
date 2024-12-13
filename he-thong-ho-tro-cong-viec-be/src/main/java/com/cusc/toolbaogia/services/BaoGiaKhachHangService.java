package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.baogiakhachhang.request.BaoGiaKhachHangCreateRequest;
import com.cusc.toolbaogia.dto.baogiakhachhang.request.BaoGiaKhachHangUpdateRequest;
import com.cusc.toolbaogia.dto.baogiakhachhang.response.BaoGiaKhachHangResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BaoGiaKhachHangMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.BaoGiaKhachHang;
import com.cusc.toolbaogia.models.KhachHang;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.BaoGiaKhachHangJPA;
import com.cusc.toolbaogia.repositories.KhachHangJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoGiaKhachHangService {
        @Autowired
        BaoGiaKhachHangMapper baoGiaKhachHangMapper;
        @Autowired
        BaoGiaKhachHangJPA baoGiaKhachHangJPA;
        @Autowired
        KhachHangJPA khachHangJPA;
        @Autowired
        BaoGiaJPA baoGiaJPA;

        public PageImpl<BaoGiaKhachHangResponse> getAll(int page, int size) {
                Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
                Page<BaoGiaKhachHang> pageBaoGiaKhachHang = baoGiaKhachHangJPA.findAllByNgayXoaIsNull(pageable);
                List<BaoGiaKhachHangResponse> list = pageBaoGiaKhachHang.stream()
                                .map(baogiakhachhang -> baoGiaKhachHangMapper.tBaoGiaResponse(baogiakhachhang))
                                .collect(Collectors.toList());
                return new PageImpl<>(list, pageable, pageBaoGiaKhachHang.getTotalElements());
        }

        public BaoGiaKhachHangResponse getById(int id) {
                BaoGiaKhachHang entity = baoGiaKhachHangJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Báo giá khách hàng"));
                return baoGiaKhachHangMapper.tBaoGiaResponse(entity);
        }

        public List<BaoGiaKhachHangResponse> create(BaoGiaKhachHangCreateRequest baoGiaKhachHangCreateRequest) {
                BaoGia baoGia = baoGiaJPA.findById(baoGiaKhachHangCreateRequest.getBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
                List<BaoGiaKhachHang> list = new ArrayList<>();
                baoGiaKhachHangCreateRequest.getKhachHang().forEach(idKhachHang -> {
                        BaoGiaKhachHang entity = new BaoGiaKhachHang();
                        KhachHang khachHang = khachHangJPA.findById(idKhachHang)
                                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                        "Khách hàng"));
                        entity.setBaoGia(baoGia);
                        entity.setKhachHang(khachHang);
                        entity.setNgayTao(LocalDateTime.now());
                        list.add(baoGiaKhachHangJPA.save(entity));
                });
                return list.stream()
                                .map(khachhang -> baoGiaKhachHangMapper.tBaoGiaResponse(khachhang))
                                .collect(Collectors.toList());
        }

        public BaoGiaKhachHangResponse update(BaoGiaKhachHangUpdateRequest baoGiaKhachHangUpdateRequest) {
                KhachHang khachHang = khachHangJPA.findById(baoGiaKhachHangUpdateRequest.getKhachHang())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Khách hàng"));
                BaoGia baoGia = baoGiaJPA.findById(baoGiaKhachHangUpdateRequest.getBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
                BaoGiaKhachHang entity = baoGiaKhachHangJPA.findById(baoGiaKhachHangUpdateRequest.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Khách hàng"));
                entity.setBaoGia(baoGia);
                entity.setKhachHang(khachHang);
                entity.setNgaySua(LocalDateTime.now());
                return baoGiaKhachHangMapper.tBaoGiaResponse(baoGiaKhachHangJPA.save(entity));
        }

        public void delete(Integer id) {
                BaoGiaKhachHang entity = baoGiaKhachHangJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,
                                                "Báo giá khách hàng"));
                entity.setNgayXoa(LocalDateTime.now());
                baoGiaKhachHangJPA.save(entity);
        }
}
