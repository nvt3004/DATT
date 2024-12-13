package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianCreateRequest;
import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianDeleteRequest;
import com.cusc.toolbaogia.dto.thoigian.request.ThoiGianUpdateRequest;
import com.cusc.toolbaogia.dto.thoigian.response.ThoiGianResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.ThoiGianMapper;
import com.cusc.toolbaogia.models.ThoiGian;
import com.cusc.toolbaogia.repositories.ThoigianJPA;
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
public class ThoiGianService {

    ThoigianJPA thoiGianJPA;
    ThoiGianMapper thoiGianMapper;

    @Transactional
    public ThoiGianResponse createThoiGian(ThoiGianCreateRequest request) {
        ThoiGian thoiGian = thoiGianMapper.toThoiGian(request);
        thoiGian.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        thoiGianJPA.save(thoiGian);
        return thoiGianMapper.toThoiGianResponse(thoiGian);
    }

    @Transactional
    public ThoiGianResponse updateThoiGian(ThoiGianUpdateRequest request) {
        ThoiGian thoiGian = thoiGianJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));

        thoiGianMapper.updateThoiGian(thoiGian, request);
        thoiGian.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        thoiGianJPA.save(thoiGian);
        return thoiGianMapper.toThoiGianResponse(thoiGian);
    }

    @Transactional
    public void deleteThoiGianByList(ThoiGianDeleteRequest request) {
        for (Integer id : request.getIds()) {
            ThoiGian thoiGian = thoiGianJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
            thoiGian.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            thoiGianJPA.save(thoiGian);
        }
    }

    @Transactional
    public void deleteThoiGianById(int id) {
        ThoiGian thoiGian = thoiGianJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));

        thoiGian.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        thoiGianJPA.save(thoiGian);
    }

    public PageImpl<ThoiGianResponse> getAllThoiGian(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ThoiGian> thoiGianPage = thoiGianJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<ThoiGianResponse> responseList = thoiGianPage.getContent().stream()
                .map(thoiGianMapper::toThoiGianResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, thoiGianPage.getTotalElements());
    }

    public ThoiGianResponse getThoiGianById(int id) {
        ThoiGian thoiGian = thoiGianJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
        return thoiGianMapper.toThoiGianResponse(thoiGian);
    }
}
