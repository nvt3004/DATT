package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.dichvubaohanh.request.DichVuBHCreateRequset;
import com.cusc.toolbaogia.dto.dichvubaohanh.request.DichVuBHUpdateRequest;
import com.cusc.toolbaogia.dto.dichvubaohanh.response.DichVuBHResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BaoHanhMapper;
import com.cusc.toolbaogia.mapper.DichVuBaoHanhMapper;
import com.cusc.toolbaogia.models.BaoHanh;
import com.cusc.toolbaogia.models.DichVuBaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhJPA;
import com.cusc.toolbaogia.repositories.DichVuBaoHanhJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DichVuBaoHanhService {
    @Autowired
    DichVuBaoHanhJPA dichVuBaoHanhJPA;
    @Autowired
    DichVuBaoHanhMapper dichVuBaoHanhMapper;
    @Autowired
    BaoHanhMapper baoHanhMapper;
    @Autowired
    BaoHanhJPA baoHanhJPA;

    public Page<DichVuBHResponse> getAllDichVu(int page, int size, String key, Integer idbaohanh) {
        Pageable pageable = PageRequest.of(page - 1, size,Sort.by(Direction.DESC, "id"));
        Page<DichVuBaoHanh> listDichVu;
        if (idbaohanh != null) {
            BaoHanh baoHanh = baoHanhJPA.findById(idbaohanh)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Bảo hành"));
            if (key != null) {
                listDichVu = dichVuBaoHanhJPA.findAllByBaoHanhAndNgayXoaIsNullAndNoiDungContaining(baoHanh, key,
                        pageable);
            } else {
                listDichVu = dichVuBaoHanhJPA.findAllByBaoHanhAndNgayXoaIsNull(baoHanh, pageable);
            }
        } else {
            if (key != null) {
                listDichVu = dichVuBaoHanhJPA.findAllByNgayXoaIsNullAndNoiDungContaining(key, pageable);
            } else {
                listDichVu = dichVuBaoHanhJPA.findAllByNgayXoaIsNull(pageable);
            }
        }
        Page<DichVuBHResponse> lDichVuBaoHanhDTOs = listDichVu.map(this::getDichVuBaoHanhDTO);

        return lDichVuBaoHanhDTOs;
    }

    public DichVuBHResponse getDichVu(Integer id) {
        DichVuBaoHanh dichVuBaoHanh = dichVuBaoHanhJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Dịch vụ bảo hành"));
        return getDichVuBaoHanhDTO(dichVuBaoHanh);
    }

    public DichVuBHResponse create(DichVuBHCreateRequset dichvu) {
        BaoHanh baoHanh = baoHanhJPA.findById(dichvu.getBaoHanhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Bảo hành"));
        DichVuBaoHanh entity = new DichVuBaoHanh();
        entity.setNgayTao(LocalDateTime.now());
        entity.setNoiDung(dichvu.getNoiDung());
        entity.setBaoHanh(baoHanh);
        return getDichVuBaoHanhDTO(dichVuBaoHanhJPA.save(entity));
    }

    public DichVuBHResponse update(DichVuBHUpdateRequest dichvu) {
        BaoHanh baoHanh = baoHanhJPA.findById(dichvu.getBaoHanhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Bảo hành"));
        DichVuBaoHanh entity = dichVuBaoHanhJPA.findById(dichvu.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Dịch vụ bảo hành"));
        entity.setNgaySua(LocalDateTime.now());
        entity.setNoiDung(dichvu.getNoiDung());
        entity.setBaoHanh(baoHanh);
        return getDichVuBaoHanhDTO(dichVuBaoHanhJPA.save(entity));
    }

    public void delete(Integer id) {
        DichVuBaoHanh entity = dichVuBaoHanhJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Dịch vụ bảo hành"));
        entity.setNgayXoa(LocalDateTime.now());
        dichVuBaoHanhJPA.save(entity);
    }

    private DichVuBHResponse getDichVuBaoHanhDTO(DichVuBaoHanh dichVuBaoHanh) {
        BaoHanhResponse baoHanh = baoHanhMapper.tBaoHanh2Response(dichVuBaoHanh.getBaoHanh());
        DichVuBHResponse dichVuBHResponse = dichVuBaoHanhMapper.toBhResponse(dichVuBaoHanh);
        dichVuBHResponse.setBaoHanh(baoHanh);
        return dichVuBHResponse;
    }

}
