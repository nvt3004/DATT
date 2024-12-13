package com.cusc.toolbaogia.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.danhxung.request.DanhXungCreateRequest;
import com.cusc.toolbaogia.dto.danhxung.request.DanhXungDeleteRequest;
import com.cusc.toolbaogia.dto.danhxung.request.DanhXungUpdateRequest;
import com.cusc.toolbaogia.dto.danhxung.response.DanhXungResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.DanhXungMapper;
import com.cusc.toolbaogia.models.DanhXung;
import com.cusc.toolbaogia.repositories.DanhXungJPA;

import com.cusc.toolbaogia.utils.CurrentDateVietnam;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DanhXungService {

    DanhXungJPA danhXungJPA;
    DanhXungMapper danhXungMapper;

    @Transactional
    public DanhXungResponse createDanhXung(DanhXungCreateRequest request) {
        DanhXung danhXung = danhXungMapper.toDanhXung(request);
        danhXung.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        danhXungJPA.save(danhXung);
        return danhXungMapper.toDanhXungResponse(danhXung);
    }

    @Transactional
    public DanhXungResponse updateDanhXung(DanhXungUpdateRequest request) {
        DanhXung danhXung = danhXungJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        danhXungMapper.updateDanhXung(danhXung, request);
        danhXung.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        danhXungJPA.save(danhXung);
        return danhXungMapper.toDanhXungResponse(danhXung);
    }

    @Transactional
    public void deleteDanhXungByList(DanhXungDeleteRequest request) {
        for (Integer id : request.getIds()) {
            DanhXung danhXung = danhXungJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
            danhXung.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            danhXungJPA.save(danhXung);
        }
    }

    @Transactional
    public void deleteDanhXungById(int id) {
        DanhXung danhXung = danhXungJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        danhXung.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        danhXungJPA.save(danhXung);
    }

    public PageImpl<DanhXungResponse> getAllDanhXung(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<DanhXung> danhXungPage = danhXungJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<DanhXungResponse> responseList = danhXungPage.getContent().stream()
                .map(danhXungMapper::toDanhXungResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, danhXungPage.getTotalElements());
    }

    public DanhXungResponse getDanhXungById(int id) {
        DanhXung danhXung = danhXungJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Danh xưng"));
        return danhXungMapper.toDanhXungResponse(danhXung);
    }
}
