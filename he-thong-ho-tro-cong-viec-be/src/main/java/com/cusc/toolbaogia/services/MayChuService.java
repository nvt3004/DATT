package com.cusc.toolbaogia.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.maychu.request.MayChuCreateRequest;
import com.cusc.toolbaogia.dto.maychu.request.MayChuDeleteRequest;
import com.cusc.toolbaogia.dto.maychu.request.MayChuUpdateRequest;
import com.cusc.toolbaogia.dto.maychu.response.MayChuResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.MayChuMapper;
import com.cusc.toolbaogia.models.MayChu;
import com.cusc.toolbaogia.repositories.MayChuJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MayChuService {

    private final MayChuJPA mayChuJPA;
    private final MayChuMapper mayChuMapper;

    @Transactional
    public MayChuResponse createMayChu(MayChuCreateRequest request) {
        MayChu mayChu = mayChuMapper.toMayChu(request);
        mayChu.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        mayChuJPA.save(mayChu);
        return mayChuMapper.toMayChuResponse(mayChu);
    }

    @Transactional
    public MayChuResponse updateMayChu(MayChuUpdateRequest request) {
        MayChu mayChu = mayChuJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
        mayChuMapper.updateMayChu(mayChu, request);
        mayChu.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        mayChuJPA.save(mayChu);
        return mayChuMapper.toMayChuResponse(mayChu);
    }

    @Transactional
    public void deleteMayChuById(int id) {
        MayChu mayChu = mayChuJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
        mayChu.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        mayChuJPA.save(mayChu);
    }

    @Transactional
    public void deleteMayChuByList(MayChuDeleteRequest request) {
        for (Integer id : request.getIds()) {
            MayChu mayChu = mayChuJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
            mayChu.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            mayChuJPA.save(mayChu);
        }
    }

    public PageImpl<MayChuResponse> getAllMayChu(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<MayChu> mayChuPage = mayChuJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<MayChuResponse> responseList = mayChuPage.getContent().stream()
                .map(mayChuMapper::toMayChuResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, mayChuPage.getTotalElements());
    }

    public MayChuResponse getMayChuById(Integer id) {
        MayChu mayChu = mayChuJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Máy chủ"));
        return mayChuMapper.toMayChuResponse(mayChu);
    }
}
