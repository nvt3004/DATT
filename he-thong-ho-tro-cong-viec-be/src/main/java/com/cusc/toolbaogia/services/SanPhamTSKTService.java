package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTCreateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamtskt.response.SanPhamTSKTResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamTSKTMapper;
import com.cusc.toolbaogia.models.SanPhamBaoGia;
import com.cusc.toolbaogia.models.SanPhamTSKT;
import com.cusc.toolbaogia.models.ThongSo;
import com.cusc.toolbaogia.models.ThongSoGroup;
import com.cusc.toolbaogia.repositories.SanPhamBaoGiaJPA;
import com.cusc.toolbaogia.repositories.SanPhamTSKTJPA;
import com.cusc.toolbaogia.repositories.ThongSoGroupJPA;
import com.cusc.toolbaogia.repositories.ThongSoJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamTSKTService {

    @Autowired
    private SanPhamTSKTJPA sanPhamTSKTJPA;

    @Autowired
    private SanPhamTSKTMapper sanPhamTSKTMapper;

    @Autowired
    private ThongSoGroupJPA thongSoGroupJPA;

    @Autowired
    private SanPhamBaoGiaJPA sanPhamBaoGiaJPA;

    @Autowired
    private ThongSoJPA thongSoJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamTSKTResponse createSanPhamTSKT(SanPhamTSKTCreateRequest request) {
        SanPhamTSKT sanPhamTSKT = sanPhamTSKTMapper.tosPhamTSKT(request);
        sanPhamTSKT.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamTSKTJPA.save(sanPhamTSKT);
        return sanPhamTSKTMapper.toSanPhamTSKTResponse(sanPhamTSKT);
    }

    @Transactional
    public SanPhamTSKTResponse updateSanPhamTSKT(SanPhamTSKTUpdateRequest request) {

        SanPhamTSKT sanPhamTSKT = sanPhamTSKTJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm thông số kỹ thuật"));

        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));
        sanPhamTSKT.setSanPhamBaoGia(sanPhamBaoGia);

        ThongSoGroup thongSoGroup = thongSoGroupJPA.findById(request.getThongSoGroupId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));
        sanPhamTSKT.setThongSoGroup(thongSoGroup);

        ThongSo thongSo = thongSoJPA.findById(request.getThongSoId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));
        sanPhamTSKT.setThongSo(thongSo);

        sanPhamTSKTMapper.updateSanPhamTSKT(sanPhamTSKT, request);
        sanPhamTSKT.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        sanPhamTSKTJPA.save(sanPhamTSKT);
        return sanPhamTSKTMapper.toSanPhamTSKTResponse(sanPhamTSKT);
    }

    @Transactional
    public void deleteSanPhamTSKTByList(SanPhamTSKTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPhamTSKT sanPhamTSKT = sanPhamTSKTJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm thông số kỹ thuật"));
            sanPhamTSKT.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamTSKTJPA.save(sanPhamTSKT);
        }
    }

    @Transactional
    public void deleteSanPhamTSKTById(int id) {
        SanPhamTSKT sanPhamTSKT = sanPhamTSKTJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm thông số kỹ thuật"));
        sanPhamTSKT.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamTSKTJPA.save(sanPhamTSKT);
    }

    public PageImpl<SanPhamTSKTResponse> getAllSanPhamTSKT(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPhamTSKT> phanMemTSKTPage = sanPhamTSKTJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamTSKTResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(sanPhamTSKTMapper::toSanPhamTSKTResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public SanPhamTSKTResponse getSanPhamTSKTById(int id) {
        SanPhamTSKT sanPhamTSKT = sanPhamTSKTJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm thông số kỹ thuật"));
        return sanPhamTSKTMapper.toSanPhamTSKTResponse(sanPhamTSKT);
    }

}
