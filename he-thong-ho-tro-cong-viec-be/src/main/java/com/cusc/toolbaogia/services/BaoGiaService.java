package com.cusc.toolbaogia.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.baogia.request.BaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baogia.request.BaoGiaDeleteRequest;
import com.cusc.toolbaogia.dto.baogia.request.BaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baogia.response.BaoGiaResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BaoGiaMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.GoiBaoGia;
import com.cusc.toolbaogia.models.NguoiDung;
import com.cusc.toolbaogia.models.ThoiGian;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.GoiBaoGiaJPA;
import com.cusc.toolbaogia.repositories.NguoiDungJPA;
import com.cusc.toolbaogia.repositories.ThoigianJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

@Service
public class BaoGiaService {

    @Autowired
    private BaoGiaJPA baoGiaJPA;

    @Autowired
    private BaoGiaMapper baoGiaMapper;

    @Autowired
    private ThoigianJPA thoigianJPA;

    @Autowired
    private NguoiDungJPA nguoiDungJPA;

    @Autowired
    private GoiBaoGiaJPA goiSanPhamJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public BaoGiaResponse createBaoGia(BaoGiaCreateRequest request) {
        BaoGia baoGia = baoGiaMapper.toBaoGia(request);
        baoGia.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        baoGiaJPA.save(baoGia);
        return baoGiaMapper.toBaoGiaResponse(baoGia);
    }

    @Transactional
    public BaoGiaResponse updateBaoGia(BaoGiaUpdateRequest request) {
        BaoGia baoGia = baoGiaJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));

        NguoiDung nguoiDung = nguoiDungJPA.findById(request.getNguoiDungId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
        baoGia.setNguoiDung(nguoiDung);
        GoiBaoGia goiBaoGia = goiSanPhamJPA.findById(request.getGoiSanPhamId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Gói báo giá"));
        baoGia.setGoiBaoGia(goiBaoGia);
        ThoiGian thoiGian = thoigianJPA.findById(request.getThoiGianId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
        baoGia.setThoiGian(thoiGian);

        baoGiaMapper.updateBaoGia(baoGia, request);
        baoGia.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        baoGiaJPA.save(baoGia);
        return baoGiaMapper.toBaoGiaResponse(baoGia);
    }

    @Transactional
    public void deleteBaoGiaByList(BaoGiaDeleteRequest request) {
        for (Integer id : request.getIds()) {
            BaoGia baoGia = baoGiaJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));

            baoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            baoGiaJPA.save(baoGia);
        }
    }

    @Transactional
    public void deleteBaoGiaById(int id) {
        BaoGia baoGia = baoGiaJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));

        baoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        baoGiaJPA.save(baoGia);
    }

    public PageImpl<BaoGiaResponse> getAllBaoGia(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<BaoGia> baoGiaPage = baoGiaJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<BaoGiaResponse> responseList = baoGiaPage.getContent().stream()
                .map(baoGiaMapper::toBaoGiaResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, baoGiaPage.getTotalElements());
    }

    public BaoGiaResponse getBaoGiaById(int id) {
        BaoGia baoGia = baoGiaJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));

        BigDecimal tongtien = baoGia.getListChucNangHangMuc().stream()
                .map(chucNangHangMuc -> chucNangHangMuc.getGia() != null ? chucNangHangMuc.getGia()
                        : chucNangHangMuc.getHangMuc().getGia())
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        baoGia.setTongtien(tongtien);

        return baoGiaMapper.toBaoGiaResponse(baoGia);
    }

}
