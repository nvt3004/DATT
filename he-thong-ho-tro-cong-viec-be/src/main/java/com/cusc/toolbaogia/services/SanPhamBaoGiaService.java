package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.request.SanPhamBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.sanphambaogia.response.SanPhamBaoGiaResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamBaoGiaMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.SanPhamBaoGia;
import com.cusc.toolbaogia.models.SanPham;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.SanPhamBaoGiaJPA;
import com.cusc.toolbaogia.repositories.SanPhamJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamBaoGiaService {

    @Autowired
    private SanPhamBaoGiaJPA sanPhamBaoGiaJPA;

    @Autowired
    private SanPhamBaoGiaMapper sanPhamBaoGiaMapper;

    @Autowired
    private SanPhamJPA sanPhamJPA;

    @Autowired
    private BaoGiaJPA baoGiaJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamBaoGiaResponse createSanPhamBaoGia(SanPhamBaoGiaCreateRequest request) {
        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaMapper.toSanPhamBaoGia(request);
        sanPhamBaoGia.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamBaoGiaJPA.save(sanPhamBaoGia);
        return sanPhamBaoGiaMapper.toSanPhamBaoGiaResponse(sanPhamBaoGia);
    }

    @Transactional
    public SanPhamBaoGiaResponse updateSanPhamBaoGia(SanPhamBaoGiaUpdateRequest request) {

        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));

        BaoGia baoGia = baoGiaJPA.findById(request.getBaoGiaId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
        sanPhamBaoGia.setBaoGia(baoGia);

        SanPham sanPham = sanPhamJPA.findById(request.getSanPhamId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));
        sanPhamBaoGia.setSanPham(sanPham);

        sanPhamBaoGiaMapper.updateSanPhamBaoGia(sanPhamBaoGia, request);
        sanPhamBaoGia.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        sanPhamBaoGiaJPA.save(sanPhamBaoGia);
        return sanPhamBaoGiaMapper.toSanPhamBaoGiaResponse(sanPhamBaoGia);
    }

    @Transactional
    public void deleteSanPhamBaoGiaByList(SanPhamTSKTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));
            sanPhamBaoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamBaoGiaJPA.save(sanPhamBaoGia);
        }
    }

    @Transactional
    public void deleteSanPhamBaoGiaById(int id) {
        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));
        sanPhamBaoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamBaoGiaJPA.save(sanPhamBaoGia);
    }

    public PageImpl<SanPhamBaoGiaResponse> getAllSanPhamBaoGia(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPhamBaoGia> phanMemTSKTPage = sanPhamBaoGiaJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamBaoGiaResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(sanPhamBaoGiaMapper::toSanPhamBaoGiaResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public SanPhamBaoGiaResponse getSanPhamBaoGiaById(int id) {
        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));
        return sanPhamBaoGiaMapper.toSanPhamBaoGiaResponse(sanPhamBaoGia);
    }

    public SanPhamBaoGiaResponse getSanPhamBaoGiaByBaoGiaId(int baoGiaId) {
        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findByBaoGia_Id(baoGiaId)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
        return sanPhamBaoGiaMapper.toSanPhamBaoGiaResponse(sanPhamBaoGia);
    }

}
