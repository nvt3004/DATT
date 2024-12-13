package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuListCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.request.SanPhamMayChuUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychu.response.SanPhamMayChuResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamMayChuMapper;
import com.cusc.toolbaogia.models.MayChu;
import com.cusc.toolbaogia.models.SanPhamBaoGia;
import com.cusc.toolbaogia.models.SanPhamMayChu;
import com.cusc.toolbaogia.repositories.MayChuJPA;
import com.cusc.toolbaogia.repositories.SanPhamBaoGiaJPA;
import com.cusc.toolbaogia.repositories.SanPhamMayChuJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamMayChuService {

    @Autowired
    private SanPhamMayChuJPA sanPhamMayChuJPA;

    @Autowired
    private SanPhamMayChuMapper sanPhamMayChuMapper;

    @Autowired
    private SanPhamBaoGiaJPA sanPhamBaoGiaJPA;

    @Autowired
    private MayChuJPA mayChuJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamMayChuResponse createSanPhamMayChu(SanPhamMayChuCreateRequest request) {
        SanPhamMayChu sanPhamMayChu = sanPhamMayChuMapper.toSanPhamMayChu(request);
        sanPhamMayChu.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamMayChuJPA.save(sanPhamMayChu);
        return sanPhamMayChuMapper.toSanPhamMayChuResponse(sanPhamMayChu);
    }

    @Transactional
    public List<SanPhamMayChuResponse> createSanPhamMayChu(SanPhamMayChuListCreateRequest request) {
        List<SanPhamMayChu> sanPhamMayChus = new ArrayList<>();

        if (request.getMayChuIds() != null && !request.getMayChuIds().isEmpty()) {

            request.getMayChuIds().forEach(mayChuId -> {
                SanPhamMayChu sanPhamMayChu = new SanPhamMayChu();

                SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(request.getSanPhamBaoGiaId())
                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));

                MayChu mayChu = mayChuJPA.findById(mayChuId)
                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));

                sanPhamMayChu.setSanPhamBaoGia(sanPhamBaoGia);
                sanPhamMayChu.setMayChu(mayChu);
                sanPhamMayChu.setNgayTao(CurrentDateVietnam.getCurrentDateTime());

                sanPhamMayChuJPA.save(sanPhamMayChu);

                sanPhamMayChus.add(sanPhamMayChu);
            });

        } else {

            throw new AppException(ErrorCode.FIELD_NOT_BLANK, "Danh sách mayChuIds không được để trống.");
        }

        return sanPhamMayChus.stream()
                .map(sanPhamMayChuMapper::toSanPhamMayChuResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public SanPhamMayChuResponse updateSanPhamMayChu(SanPhamMayChuUpdateRequest request) {

        SanPhamMayChu sanPhamMayChu = sanPhamMayChuJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ"));

        SanPhamBaoGia sanPhamBaoGia = sanPhamBaoGiaJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm báo giá"));
        sanPhamMayChu.setSanPhamBaoGia(sanPhamBaoGia);

        MayChu mayChu = mayChuJPA.findById(request.getMayChuId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
        sanPhamMayChu.setMayChu(mayChu);

        sanPhamMayChuMapper.updateSanPhamMayChu(sanPhamMayChu, request);
        sanPhamMayChu.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        sanPhamMayChuJPA.save(sanPhamMayChu);
        return sanPhamMayChuMapper.toSanPhamMayChuResponse(sanPhamMayChu);
    }

    @Transactional
    public void deleteSanPhamMayChuByList(SanPhamTSKTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPhamMayChu sanPhamMayChu = sanPhamMayChuJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ"));
            sanPhamMayChu.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamMayChuJPA.save(sanPhamMayChu);
        }
    }

    @Transactional
    public void deleteSanPhamMayChuById(int id) {
        SanPhamMayChu sanPhamMayChu = sanPhamMayChuJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ"));
        sanPhamMayChu.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamMayChuJPA.save(sanPhamMayChu);
    }

    public PageImpl<SanPhamMayChuResponse> getAllSanPhamMayChu(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPhamMayChu> phanMemTSKTPage = sanPhamMayChuJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamMayChuResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(sanPhamMayChuMapper::toSanPhamMayChuResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public SanPhamMayChuResponse getSanPhamMayChuById(int id) {
        SanPhamMayChu sanPhamMayChu = sanPhamMayChuJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ"));
        return sanPhamMayChuMapper.toSanPhamMayChuResponse(sanPhamMayChu);
    }

    public List<SanPhamMayChuResponse> getSanPhamMayChuBySanPhamBaoGiaId(int sanPhamBaoGiaId) {
        List<SanPhamMayChu> sanPhamMayChuList = sanPhamMayChuJPA.findBySanPhamBaoGia_Id(sanPhamBaoGiaId);
        if (sanPhamMayChuList.isEmpty()) {
            throw new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ");
        }
        return sanPhamMayChuList.stream()
                .map(sanPhamMayChuMapper::toSanPhamMayChuResponse)
                .collect(Collectors.toList());
    }

}
