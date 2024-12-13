package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.chucnang.request.ChucNangCreateRequest;
import com.cusc.toolbaogia.dto.chucnang.request.ChucNangDeleteRequest;
import com.cusc.toolbaogia.dto.chucnang.request.ChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.chucnang.response.ChucNangResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.ChucNangMapper;
import com.cusc.toolbaogia.models.ChucNang;
import com.cusc.toolbaogia.models.NhomChucNang;
import com.cusc.toolbaogia.repositories.ChucNangJPA;
import com.cusc.toolbaogia.repositories.NhomChucNangJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

@Service
public class ChucNangService {

    @Autowired
    private ChucNangJPA chucNangJPA;

    @Autowired
    private ChucNangMapper chucNangMapper;

    @Autowired
    private NhomChucNangJPA nhomChucNangJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public ChucNangResponse createChucNang(ChucNangCreateRequest request) {
        ChucNang chucNang = chucNangMapper.toChucNang(request);
        chucNang.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        chucNangJPA.save(chucNang);
        return chucNangMapper.toChucNangResponse(chucNang);
    }

    @Transactional
    public ChucNangResponse updateChucNang(ChucNangUpdateRequest request) {
        ChucNang chucNang = chucNangJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng"));
        NhomChucNang nhomChucNang = nhomChucNangJPA.findById(request.getNhomChucNangId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));
        chucNang.setNhomChucNang(nhomChucNang);
        chucNangMapper.updateChucNang(chucNang, request);
        chucNang.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        chucNangJPA.save(chucNang);
        return chucNangMapper.toChucNangResponse(chucNang);
    }

    @Transactional
    public void deleteChucNangByList(ChucNangDeleteRequest request) {
        for (Integer id : request.getIds()) {
            ChucNang chucNang = chucNangJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng"));
            chucNang.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            chucNangJPA.save(chucNang);
        }
    }

    @Transactional
    public void deleteChucNangById(int id) {
        ChucNang chucNang = chucNangJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng"));
        chucNang.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        chucNangJPA.save(chucNang);
    }

    public PageImpl<ChucNangResponse> getAllChucNang(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ChucNang> chucNangPage = chucNangJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<ChucNangResponse> responseList = chucNangPage.getContent().stream()
                .map(chucNangMapper::toChucNangResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(responseList, pageable, chucNangPage.getTotalElements());
    }

    public ChucNangResponse getChucNangById(int id) {
        ChucNang chucNang = chucNangJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng"));
        return chucNangMapper.toChucNangResponse(chucNang);
    }
}
