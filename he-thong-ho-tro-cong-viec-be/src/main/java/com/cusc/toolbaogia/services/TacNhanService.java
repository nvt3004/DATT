package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanCreateRequest;
import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanDeleteRequest;
import com.cusc.toolbaogia.dto.tacnhan.request.TacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.tacnhan.response.TacNhanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.TacNhanMapper;
import com.cusc.toolbaogia.models.TacNhan;
import com.cusc.toolbaogia.repositories.TacNhanJPA;
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
public class TacNhanService {

    TacNhanJPA tacNhanJPA;
    TacNhanMapper tacNhanMapper;

    @Transactional
    public TacNhanResponse createTacNhan(TacNhanCreateRequest request) {
        TacNhan tacNhan = tacNhanMapper.toTacNhan(request);
        tacNhan.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        tacNhanJPA.save(tacNhan);
        return tacNhanMapper.toTacNhanResponse(tacNhan);
    }

    @Transactional
    public TacNhanResponse updateTacNhan(TacNhanUpdateRequest request) {
        TacNhan tacNhan = tacNhanJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tác nhân"));

        tacNhanMapper.updateTacNhan(tacNhan, request);
        tacNhan.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        tacNhanJPA.save(tacNhan);
        return tacNhanMapper.toTacNhanResponse(tacNhan);
    }

    @Transactional
    public void deleteTacNhanByList(TacNhanDeleteRequest request) {
        for (Integer id : request.getIds()) {
            TacNhan tacNhan = tacNhanJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tác nhân"));

            tacNhan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            tacNhanJPA.save(tacNhan);
        }
    }

    @Transactional
    public void deleteTacNhanById(int id) {
        TacNhan tacNhan = tacNhanJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tác nhân"));

        tacNhan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        tacNhanJPA.save(tacNhan);
    }

    public PageImpl<TacNhanResponse> getAllTacNhan(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<TacNhan> tacNhanPage = tacNhanJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
    
        List<TacNhanResponse> responseList = tacNhanPage.getContent().stream()
                .map(tacNhanMapper::toTacNhanResponse)
                .collect(Collectors.toList());
    
        return new PageImpl<>(responseList, pageable, tacNhanPage.getTotalElements());
    }
    

    public TacNhanResponse getTacNhanById(int id) {
        TacNhan tacNhan = tacNhanJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tác nhân"));
        return tacNhanMapper.toTacNhanResponse(tacNhan);
    }
}
