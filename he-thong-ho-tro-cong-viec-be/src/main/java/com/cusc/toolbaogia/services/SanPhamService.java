package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanpham.request.SanPhamCreateRequest;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamDeleteRequest;
import com.cusc.toolbaogia.dto.sanpham.request.SanPhamUpdateRequest;
import com.cusc.toolbaogia.dto.sanpham.response.SanPhamResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamMapper;
import com.cusc.toolbaogia.models.SanPham;
import com.cusc.toolbaogia.repositories.SanPhamJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamJPA sanPhamJPA;

    @Autowired
    private SanPhamMapper sanPhamMapper;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamResponse createSanPham(SanPhamCreateRequest request) {
        SanPham sanPham = sanPhamMapper.toSanPham(request);
        sanPham.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamJPA.save(sanPham);
        return sanPhamMapper.toSanPhamResponse(sanPham);
    }

    @Transactional
    public SanPhamResponse updateSanPham(SanPhamUpdateRequest request) {
        SanPham sanPham = sanPhamJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));

        sanPhamMapper.updatePhanMem(sanPham, request);
        sanPham.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        sanPhamJPA.save(sanPham);
        return sanPhamMapper.toSanPhamResponse(sanPham);
    }

    @Transactional
    public void deleteSanPhamByList(SanPhamDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPham sanPham = sanPhamJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));

            sanPham.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamJPA.save(sanPham);
        }
    }

    @Transactional
    public void deleteSanPhamById(int id) {
        SanPham sanPham = sanPhamJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));

        sanPham.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamJPA.save(sanPham);
    }

    public PageImpl<SanPhamResponse> getAllSanPham(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPham> phanMemPage = sanPhamJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamResponse> responseList = phanMemPage.getContent().stream()
                .map(sanPhamMapper::toSanPhamResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemPage.getTotalElements());
    }

    public SanPhamResponse getSanPhamById(int id) {
        SanPham sanPham = sanPhamJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));
        return sanPhamMapper.toSanPhamResponse(sanPham);
    }

    
}
