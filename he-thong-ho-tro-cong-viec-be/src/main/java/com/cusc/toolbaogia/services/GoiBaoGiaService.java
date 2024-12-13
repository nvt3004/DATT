package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaDeleteRequest;
import com.cusc.toolbaogia.dto.goibaogia.request.GoiBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.goibaogia.response.GoiBaoGiaResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.GoiBaoGiaMapper;
import com.cusc.toolbaogia.models.GoiBaoGia;
import com.cusc.toolbaogia.repositories.GoiBaoGiaJPA;
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
public class GoiBaoGiaService {

    GoiBaoGiaJPA goiBaoGiaJPA;
    GoiBaoGiaMapper goiBaoGiaMapper;

    @Transactional
    public GoiBaoGiaResponse createGoiBaoGia(GoiBaoGiaCreateRequest request) {
        GoiBaoGia goiBaoGia = goiBaoGiaMapper.toGoiBaoGia(request);
        goiBaoGia.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        goiBaoGiaJPA.save(goiBaoGia);
        return goiBaoGiaMapper.toGoiBaoGiaResponse(goiBaoGia);
    }

    @Transactional
    public GoiBaoGiaResponse updateGoiBaoGia(GoiBaoGiaUpdateRequest request) {
        GoiBaoGia goiBaoGia = goiBaoGiaJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Gói báo giá"));

                goiBaoGiaMapper.updateGoiBaoGia(goiBaoGia, request);
        goiBaoGia.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        goiBaoGiaJPA.save(goiBaoGia);
        return goiBaoGiaMapper.toGoiBaoGiaResponse(goiBaoGia);
    }

    @Transactional
    public void deleteGoiBaoGiaByList(GoiBaoGiaDeleteRequest request) {
        for (Integer id : request.getIds()) {
            GoiBaoGia goiBaoGia = goiBaoGiaJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Gói báo giá"));
            goiBaoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            goiBaoGiaJPA.save(goiBaoGia);
        }
    }

    @Transactional
    public void deleteGoiBaoGiaById(int id) {
        GoiBaoGia goiBaoGia = goiBaoGiaJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Gói báo giá"));
                goiBaoGia.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        goiBaoGiaJPA.save(goiBaoGia);
    }

    public PageImpl<GoiBaoGiaResponse> getAllGoiBaoGia(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<GoiBaoGia> goiBaoGiaPage = goiBaoGiaJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<GoiBaoGiaResponse> responseList = goiBaoGiaPage.getContent().stream()
                .map(goiBaoGiaMapper::toGoiBaoGiaResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, goiBaoGiaPage.getTotalElements());
    }

    public GoiBaoGiaResponse getGoiBaoGiaById(int id) {
        GoiBaoGia goiBaoGia = goiBaoGiaJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Gói báo giá"));
        return goiBaoGiaMapper.toGoiBaoGiaResponse(goiBaoGia);
    }
}
