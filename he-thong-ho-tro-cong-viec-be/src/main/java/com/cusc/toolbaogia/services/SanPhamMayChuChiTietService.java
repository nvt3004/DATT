package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTCreateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTDeleteRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.request.SanPhamMCCTUpdateRequest;
import com.cusc.toolbaogia.dto.sanphammaychuchitiet.response.SanPhamMCCTResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamMayChuChiTietMapper;
import com.cusc.toolbaogia.models.MayChu;
import com.cusc.toolbaogia.models.SanPhamMayChuChiTiet;
import com.cusc.toolbaogia.models.ThongSo;
import com.cusc.toolbaogia.models.ThongSoGroup;
import com.cusc.toolbaogia.repositories.MayChuJPA;
import com.cusc.toolbaogia.repositories.SanPhamMayChuChiTietJPA;
import com.cusc.toolbaogia.repositories.ThongSoGroupJPA;
import com.cusc.toolbaogia.repositories.ThongSoJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamMayChuChiTietService {

    @Autowired
    private SanPhamMayChuChiTietJPA sanPhamMayChuChiTietJPA;

    @Autowired
    private SanPhamMayChuChiTietMapper sanPhamMayChuChiTietMapper;

    @Autowired
    private ThongSoGroupJPA thongSoGroupJPA;

    @Autowired
    private ThongSoJPA thongSoJPA;

    @Autowired
    private MayChuJPA mayChuJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamMCCTResponse createSanPhamMayChuChiTiet(SanPhamMCCTCreateRequest request) {
        SanPhamMayChuChiTiet sanPhamMayChuChiTiet = sanPhamMayChuChiTietMapper.toSanPhamMayChuChiTiet(request);
        sanPhamMayChuChiTiet.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamMayChuChiTietJPA.save(sanPhamMayChuChiTiet);
        return sanPhamMayChuChiTietMapper.toSanPhamMayChuChiTietResponse(sanPhamMayChuChiTiet);
    }

    @Transactional
    public SanPhamMCCTResponse updateSanPhamMayChuChiTiet(SanPhamMCCTUpdateRequest request) {

        SanPhamMayChuChiTiet sanPhamMayChuChiTiet = sanPhamMayChuChiTietJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ chi tiết"));

        MayChu mayChu = mayChuJPA.findById(request.getMayChuId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
        sanPhamMayChuChiTiet.setMayChu(mayChu);

        ThongSoGroup thongSoGroup = thongSoGroupJPA.findById(request.getThongSoGroupId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));
        sanPhamMayChuChiTiet.setThongSoGroup(thongSoGroup);

        ThongSo thongSo = thongSoJPA.findById(request.getThongSoId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));
        sanPhamMayChuChiTiet.setThongSo(thongSo);

        sanPhamMayChuChiTietMapper.updateSanPhamMayChuChiTiet(sanPhamMayChuChiTiet, request);
        sanPhamMayChuChiTiet.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        sanPhamMayChuChiTietJPA.save(sanPhamMayChuChiTiet);
        return sanPhamMayChuChiTietMapper.toSanPhamMayChuChiTietResponse(sanPhamMayChuChiTiet);
    }

    @Transactional
    public void deleteSanPhamMayChuChiTietByList(SanPhamMCCTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPhamMayChuChiTiet sanPhamMayChuChiTiet = sanPhamMayChuChiTietJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ chi tiết"));
            sanPhamMayChuChiTiet.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamMayChuChiTietJPA.save(sanPhamMayChuChiTiet);
        }
    }

    @Transactional
    public void deleteSanPhamMayChuChiTietById(int id) {
        SanPhamMayChuChiTiet sanPhamMayChuChiTiet = sanPhamMayChuChiTietJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ chi tiết"));
        sanPhamMayChuChiTiet.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamMayChuChiTietJPA.save(sanPhamMayChuChiTiet);
    }

    public PageImpl<SanPhamMCCTResponse> getAllSanPhamMayChuChiTiet(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPhamMayChuChiTiet> phanMemTSKTPage = sanPhamMayChuChiTietJPA
                .findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamMCCTResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(sanPhamMayChuChiTietMapper::toSanPhamMayChuChiTietResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public SanPhamMCCTResponse getSanPhamMayChuChiTietById(int id) {
        SanPhamMayChuChiTiet sanPhamMayChuChiTiet = sanPhamMayChuChiTietJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ chi tiết"));
        return sanPhamMayChuChiTietMapper.toSanPhamMayChuChiTietResponse(sanPhamMayChuChiTiet);
    }

    public List<SanPhamMCCTResponse> getSanPhamMCCTByMayChuId(int mayChuId) {
        List<SanPhamMayChuChiTiet> sanPhamMCCTList = sanPhamMayChuChiTietJPA.findByMayChu_Id(mayChuId);
        if (sanPhamMCCTList.isEmpty()) {
            throw new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm máy chủ chi tiết theo may chu id");
        }
        return sanPhamMCCTList.stream()
                .map(sanPhamMayChuChiTietMapper::toSanPhamMayChuChiTietResponse)
                .collect(Collectors.toList());
    }

}
