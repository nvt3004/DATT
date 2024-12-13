package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucCreateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.request.SanPhamHangMucUpdateRequest;
import com.cusc.toolbaogia.dto.sanphamhangmuc.response.SanPhamHangMucResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.SanPhamHangMucMapper;
import com.cusc.toolbaogia.models.HangMuc;
import com.cusc.toolbaogia.models.SanPhamHangMuc;
import com.cusc.toolbaogia.models.SanPham;
import com.cusc.toolbaogia.repositories.HangMucJPA;
import com.cusc.toolbaogia.repositories.SanPhamHangMucJPA;
import com.cusc.toolbaogia.repositories.SanPhamJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class SanPhamHangMucService {

    @Autowired
    private SanPhamHangMucJPA sanPhamHangMucJPA;

    @Autowired
    private SanPhamHangMucMapper sanPhamHangMucMapper;

    @Autowired
    private SanPhamJPA sanPhamJPA;

    @Autowired
    private HangMucJPA hangMucJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public SanPhamHangMucResponse createKySanPhamHangMuc(SanPhamHangMucCreateRequest request) {
        SanPhamHangMuc sanPhamHangMuc = sanPhamHangMucMapper.toSanPhamHangMuc(request);
        sanPhamHangMuc.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        sanPhamHangMucJPA.save(sanPhamHangMuc);
        return sanPhamHangMucMapper.toSanPhamHangMucResponse(sanPhamHangMuc);
    }

    @Transactional
    public SanPhamHangMucResponse updateSanPhamHangMuc(SanPhamHangMucUpdateRequest request) {

        SanPhamHangMuc sanPhamHangMuc = sanPhamHangMucJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm hạng mục"));

        HangMuc hangMuc = hangMucJPA.findById(request.getHangMucId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));
        sanPhamHangMuc.setHangMuc(hangMuc);

        SanPham sanPham = sanPhamJPA.findById(request.getSanPhamId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));
        sanPhamHangMuc.setSanPham(sanPham);

        sanPhamHangMucMapper.updateSanPhamHangMuc(sanPhamHangMuc, request);
        sanPhamHangMuc.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        sanPhamHangMucJPA.save(sanPhamHangMuc);
        return sanPhamHangMucMapper.toSanPhamHangMucResponse(sanPhamHangMuc);
    }

    @Transactional
    public void deleteSanPhamHangMucByList(SanPhamTSKTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            SanPhamHangMuc sanPhamHangMuc = sanPhamHangMucJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm hạng mục"));
            sanPhamHangMuc.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            sanPhamHangMucJPA.save(sanPhamHangMuc);
        }
    }

    @Transactional
    public void deleteSanPhamHangMucById(int id) {
        SanPhamHangMuc sanPhamHangMuc = sanPhamHangMucJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm hạng mục"));
        sanPhamHangMuc.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        sanPhamHangMucJPA.save(sanPhamHangMuc);
    }

    public PageImpl<SanPhamHangMucResponse> getAllSanPhamHangMuc(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<SanPhamHangMuc> phanMemTSKTPage = sanPhamHangMucJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<SanPhamHangMucResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(sanPhamHangMucMapper::toSanPhamHangMucResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public SanPhamHangMucResponse getSanPhamHangMucById(int id) {
        SanPhamHangMuc sanPhamHangMuc = sanPhamHangMucJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm hạng mục"));
        return sanPhamHangMucMapper.toSanPhamHangMucResponse(sanPhamHangMuc);
    }

    public List<SanPhamHangMucResponse> getSanPhamHangMucByHangMucId(int id) {
        List<SanPhamHangMuc> kyThuatCongNgheList = sanPhamHangMucJPA.findByHangMuc_Id(id);
        if (kyThuatCongNgheList.isEmpty()) {
            throw new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm hạng mục");
        }
        return kyThuatCongNgheList.stream()
                .map(sanPhamHangMucMapper::toSanPhamHangMucResponse)
                .collect(Collectors.toList());
    }

}
