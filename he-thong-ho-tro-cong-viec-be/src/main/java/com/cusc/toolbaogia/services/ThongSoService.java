package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.thongso.request.ThongSoCreateRequest;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoDeleteRequest;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoUpdateRequest;
import com.cusc.toolbaogia.dto.thongso.response.ThongSoResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.ThongSoMapper;
import com.cusc.toolbaogia.models.ThongSo;
import com.cusc.toolbaogia.repositories.ThongSoJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThongSoService {

    ThongSoJPA thongSoJPA;
    ThongSoMapper thongSoMapper;

    @Transactional
    public ThongSoResponse createThongSo(ThongSoCreateRequest request) {
        ThongSo thongSo = thongSoMapper.toThongSo(request);
        thongSo.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        thongSoJPA.save(thongSo);
        return thongSoMapper.toThongSoResponse(thongSo);
    }

    @Transactional
    public ThongSoResponse updateThongSo(ThongSoUpdateRequest request) {
        ThongSo thongSo = thongSoJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));

        thongSoMapper.updateThongSo(thongSo, request);
        thongSo.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        thongSoJPA.save(thongSo);
        return thongSoMapper.toThongSoResponse(thongSo);
    }

    @Transactional
    public void deleteThongSoByList(ThongSoDeleteRequest request) {
        for (Integer id : request.getIds()) {
            ThongSo thongSo = thongSoJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));
            thongSo.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            thongSoJPA.save(thongSo);
        }
    }

    @Transactional
    public void deleteThongSoById(int id) {
        ThongSo thongSo = thongSoJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));
        thongSo.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        thongSoJPA.save(thongSo);
    }

    public PageImpl<ThongSoResponse> getAllThongSo(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ThongSo> thongSoPage = thongSoJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<ThongSoResponse> responseList = thongSoPage.getContent().stream()
                .map(thongSoMapper::toThongSoResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(responseList, pageable, thongSoPage.getTotalElements());
    }

    public ThongSoResponse getThongSoById(int id) {
        ThongSo thongSo = thongSoJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thông số"));
        return thongSoMapper.toThongSoResponse(thongSo);
    }
}
