package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.apiresponse2.ApiResponse2;
import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheCreateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.request.KyThuatCongNgheUpdateRequest;
import com.cusc.toolbaogia.dto.kythuatcongnghe.response.KyThuatCongNgheResponse;
import com.cusc.toolbaogia.dto.sanphamtskt.request.SanPhamTSKTDeleteRequest;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.KyThuatCongNgheMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.KyThuatCongNghe;
import com.cusc.toolbaogia.models.SanPham;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.KyThuatCongNgheJPA;
import com.cusc.toolbaogia.repositories.SanPhamJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class KyThuatCongNgheService {

    @Autowired
    private KyThuatCongNgheJPA kyThuatCongNgheJPA;

    @Autowired
    private KyThuatCongNgheMapper kyThuatCongNgheMapper;

    @Autowired
    private SanPhamJPA sanPhamJPA;

    @Autowired
    private BaoGiaJPA baoGiaJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public KyThuatCongNgheResponse createKyThuatCongNghe(KyThuatCongNgheCreateRequest request) {
        KyThuatCongNghe kyThuatCongNghe = kyThuatCongNgheMapper.toKyThuatCongNghe(request);
        kyThuatCongNghe.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        kyThuatCongNgheJPA.save(kyThuatCongNghe);
        return kyThuatCongNgheMapper.toKyCongNgheResponse(kyThuatCongNghe);
    }

    @Transactional
    public KyThuatCongNgheResponse updateKyThuatCongNghe(KyThuatCongNgheUpdateRequest request) {

        KyThuatCongNghe kyThuatCongNghe = kyThuatCongNgheJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Kỹ thuật công nghệ"));

        BaoGia baoGia = baoGiaJPA.findById(request.getBaoGiaId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
        kyThuatCongNghe.setBaoGia(baoGia);

        SanPham sanPham = sanPhamJPA.findById(request.getSanPhamId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Sản phẩm"));
        kyThuatCongNghe.setSanPham(sanPham);

        kyThuatCongNgheMapper.updateKyThuatCongNghe(kyThuatCongNghe, request);
        kyThuatCongNghe.setNgaySua(CurrentDateVietnam.getCurrentDateTime());

        kyThuatCongNgheJPA.save(kyThuatCongNghe);
        return kyThuatCongNgheMapper.toKyCongNgheResponse(kyThuatCongNghe);
    }

    @Transactional
    public void deleteKyThuatCongNgheByList(SanPhamTSKTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            KyThuatCongNghe kyThuatCongNghe = kyThuatCongNgheJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Kỹ thuật công nghệ"));
            kyThuatCongNghe.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            kyThuatCongNgheJPA.save(kyThuatCongNghe);
        }
    }

    @Transactional
    public void deleteKyThuatCongNgheById(int id) {
        KyThuatCongNghe kyThuatCongNghe = kyThuatCongNgheJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Kỹ thuật công nghệ"));
        kyThuatCongNghe.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        kyThuatCongNgheJPA.save(kyThuatCongNghe);
    }

    public PageImpl<KyThuatCongNgheResponse> getAllKyThuatCongNghe(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<KyThuatCongNghe> phanMemTSKTPage = kyThuatCongNgheJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<KyThuatCongNgheResponse> responseList = phanMemTSKTPage.getContent().stream()
                .map(kyThuatCongNgheMapper::toKyCongNgheResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, phanMemTSKTPage.getTotalElements());
    }

    public KyThuatCongNgheResponse getKyThuatCongNgheById(int id) {
        KyThuatCongNghe kyThuatCongNghe = kyThuatCongNgheJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Kỹ thuật công nghệ"));
        return kyThuatCongNgheMapper.toKyCongNgheResponse(kyThuatCongNghe);
    }

    public ApiResponse2<List<KyThuatCongNgheResponse>> getKyThuatCongNgheByBaoGiaId(int baoGiaId) {
        List<KyThuatCongNghe> kyThuatCongNgheList = kyThuatCongNgheJPA.findByBaoGia_IdAndNgayXoaIsNull(baoGiaId);
    
        if (kyThuatCongNgheList.isEmpty()) {
            return ApiResponse2.<List<KyThuatCongNgheResponse>>builder()
                    .code(2004)
                    .message("Không tìm thấy kỹ thuật công nghệ cho báo giá với id " + baoGiaId)
                    .result(Collections.emptyList())  // Hoặc có thể trả về `null` nếu muốn kết quả rỗng
                    .build();
        }
    
        List<KyThuatCongNgheResponse> responseList = kyThuatCongNgheList.stream()
                .map(kyThuatCongNgheMapper::toKyCongNgheResponse)
                .collect(Collectors.toList());
    
        return ApiResponse2.<List<KyThuatCongNgheResponse>>builder()
                .code(1000)
                .message("Lấy danh sách kỹ thuật công nghệ theo id báo giá thành công")
                .result(responseList)
                .build();
    }

}
