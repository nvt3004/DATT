package com.cusc.toolbaogia.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTCreateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTDeleteRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.request.BaoGiaPhuongThucTTUpdateRequest;
import com.cusc.toolbaogia.dto.baogiaphuongthuctt.response.BaoGiaPhuongThucTTResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BaoGiaPhuongThucTTMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.BaoGiaPhuongThucThanhToan;
import com.cusc.toolbaogia.models.PhuongThucThanhToan;
import com.cusc.toolbaogia.models.ThoiGian;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.BaoGiaPhuongThucTTJPA;
import com.cusc.toolbaogia.repositories.PhuongThucThanhToanJPA;
import com.cusc.toolbaogia.repositories.ThoigianJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoGiaPhuongThucThanhToanService {

    @Autowired
    private BaoGiaPhuongThucTTJPA baoGiaPhuongThucThanhToanJPA;

    @Autowired
    private BaoGiaPhuongThucTTMapper baoGiaPhuongThucThanhToanMapper;

    @Autowired
    private BaoGiaJPA baoGiaJPA;

    @Autowired
    private PhuongThucThanhToanJPA phuongThucThanhToanJPA;

    @Autowired
    private ThoigianJPA thoigianJPA;

    @Transactional
    public BaoGiaPhuongThucTTResponse createBaoGiaPhuongThucThanhToan(BaoGiaPhuongThucTTCreateRequest request) {
        BaoGiaPhuongThucThanhToan baoGiaPTTTByBaoGiaId = baoGiaPhuongThucThanhToanJPA.findTopByBaoGiaIdOrderByNgayTaoDesc(request.getBaoGia())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));

        BaoGiaPhuongThucThanhToan entity = baoGiaPhuongThucThanhToanMapper.toBaoGiaPhuongThucThanhToan(request);
        entity.setNgayTao(CurrentDateVietnam.getCurrentDateTime());

        System.out.println("Bao gia phuong thuc tt id = "+baoGiaPTTTByBaoGiaId.getId());
        System.out.println("Giá trị còn lại trước khi trừ = "+baoGiaPTTTByBaoGiaId.getGiaTriConLai());
        System.out.println("Giá trị từ resquest = "+request.getGiaTri());
        entity.setGiaTriConLai(baoGiaPTTTByBaoGiaId.getGiaTriConLai().subtract(request.getGiaTri()));
        entity.setSoLanThanhToan(baoGiaPTTTByBaoGiaId.getSoLanThanhToan()+1);

        baoGiaPhuongThucThanhToanJPA.save(entity);
        System.out.println("Giá trị còn lại sau khi trừ đi từ request = "+entity.getGiaTriConLai());
        return baoGiaPhuongThucThanhToanMapper.toBaoGiaPhuongThucTTResponse(entity);
    }

    @Transactional
    public BaoGiaPhuongThucTTResponse updateBaoGiaPhuongThucThanhToan(BaoGiaPhuongThucTTUpdateRequest request) {
        BaoGiaPhuongThucThanhToan entity = baoGiaPhuongThucThanhToanJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá phương thức thanh toán"));

        BaoGia baoGia = baoGiaJPA.findById(request.getBaoGia())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
        entity.setBaoGia(baoGia);

        PhuongThucThanhToan phuongThucThanhToan = phuongThucThanhToanJPA.findById(request.getPhuongThucThanhToan())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Phương thức thanh toán"));
        entity.setPhuongThucThanhToan(phuongThucThanhToan);

        ThoiGian thoiGian = thoigianJPA.findById(request.getThoiGian())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
        entity.setThoiGian(thoiGian);

        baoGiaPhuongThucThanhToanMapper.updateBaoGiaPhuongThucThanhToan(entity, request);
        entity.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        baoGiaPhuongThucThanhToanJPA.save(entity);
        return baoGiaPhuongThucThanhToanMapper.toBaoGiaPhuongThucTTResponse(entity);
    }

    @Transactional
    public void deleteBaoGiaPhuongThucTTByList(BaoGiaPhuongThucTTDeleteRequest request) {
        for (Integer id : request.getIds()) {
            BaoGiaPhuongThucThanhToan baoGiaPhuongThucThanhToan = baoGiaPhuongThucThanhToanJPA.findById(id)
                    .orElseThrow(
                            () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá phương thức thanh toán"));
            baoGiaPhuongThucThanhToan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            baoGiaPhuongThucThanhToanJPA.save(baoGiaPhuongThucThanhToan);
        }
    }

    @Transactional
    public void deleteBaoGiaPhuongThucTTById(int id) {
        BaoGiaPhuongThucThanhToan baoGiaPhuongThucThanhToan = baoGiaPhuongThucThanhToanJPA.findById(id)
                .orElseThrow(
                        () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá phương thức thanh toán"));
        baoGiaPhuongThucThanhToan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        baoGiaPhuongThucThanhToanJPA.save(baoGiaPhuongThucThanhToan);
    }

    public PageImpl<BaoGiaPhuongThucTTResponse> getAllBaoGiaPhuongThucThanhToan(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<BaoGiaPhuongThucThanhToan> entityPage = baoGiaPhuongThucThanhToanJPA
                .findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<BaoGiaPhuongThucTTResponse> responseList = entityPage.getContent().stream()
                .map(baoGiaPhuongThucThanhToanMapper::toBaoGiaPhuongThucTTResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, entityPage.getTotalElements());
    }

    public BaoGiaPhuongThucTTResponse getBaoGiaPhuongThucThanhToanById(int id) {
        BaoGiaPhuongThucThanhToan entity = baoGiaPhuongThucThanhToanJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá phương thức thanh toán"));
        return baoGiaPhuongThucThanhToanMapper.toBaoGiaPhuongThucTTResponse(entity);
    }
}
