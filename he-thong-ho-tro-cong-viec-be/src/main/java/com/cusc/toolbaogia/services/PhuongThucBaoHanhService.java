package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHCreateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.request.PhuongThucBHUpdateRequest;
import com.cusc.toolbaogia.dto.phuongthucbaohanh.response.PhuongThucBaoHanhResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.PhuongThucBHMapper;
import com.cusc.toolbaogia.models.BaoHanh;
import com.cusc.toolbaogia.models.PhuongThucBaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhJPA;
import com.cusc.toolbaogia.repositories.PhuongThucBaoHanhJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PhuongThucBaoHanhService {
    @Autowired
    PhuongThucBaoHanhJPA phuongThucBaoHanhJPA;
    @Autowired
    BaoHanhJPA baoHanhJPA;
    @Autowired
    PhuongThucBHMapper phuongThucBHMapper;

    public PageImpl<PhuongThucBaoHanhResponse> getAllPhuongThuc(int page, int size, String key, Integer idbaohanh) {
        BaoHanh baohanh = new BaoHanh();
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
        Page<PhuongThucBaoHanh> pagePhuongThucBaoHanh;
        if (idbaohanh != null) {
            baohanh = baoHanhJPA.findById(idbaohanh)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
        }
        if (key == null) {
            if (idbaohanh != null) {
                pagePhuongThucBaoHanh = phuongThucBaoHanhJPA.findAllByNgayXoaIsNullAndBaoHanh(baohanh, pageable);
            } else {
                pagePhuongThucBaoHanh = phuongThucBaoHanhJPA.findAllByNgayXoaIsNull(pageable);
            }
        } else {
            if (idbaohanh != null) {
                pagePhuongThucBaoHanh = phuongThucBaoHanhJPA
                        .findAllByNgayXoaIsNullAndBaoHanhAndNoiDungContainingOrMoTaContaining(baohanh, key, key,
                                pageable);
            } else {
                pagePhuongThucBaoHanh = phuongThucBaoHanhJPA
                        .findAllByNgayXoaIsNullAndNoiDungContainingOrMoTaContaining(key, key, pageable);
            }
        }
        List<PhuongThucBaoHanhResponse> list = pagePhuongThucBaoHanh.stream()
                .map(phuongthucbaohanh -> phuongThucBHMapper.toPhuongThucBaoHanhResponse(phuongthucbaohanh))
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, pagePhuongThucBaoHanh.getTotalElements());
    }

    public PhuongThucBaoHanhResponse getPhuongThuc(Integer id) {
        PhuongThucBaoHanh entity = phuongThucBaoHanhJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Phương thức bảo hành"));
        return phuongThucBHMapper.toPhuongThucBaoHanhResponse(entity);

    }

    public PhuongThucBaoHanhResponse savePhuongThuc(PhuongThucBHCreateRequest phuongThucBHCreateRequest) {
        PhuongThucBaoHanh entity = phuongThucBHMapper.toPhuongThucBaoHanhCreate(phuongThucBHCreateRequest);
        entity.setNgayTao(LocalDateTime.now());
        BaoHanh baoHanh = baoHanhJPA.findById(phuongThucBHCreateRequest.getBaoHanhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
        entity.setBaoHanh(baoHanh);
        return phuongThucBHMapper.toPhuongThucBaoHanhResponse(phuongThucBaoHanhJPA.save(entity));
    }

    public PhuongThucBaoHanhResponse putPhuongThuc(PhuongThucBHUpdateRequest phuongThucBHUpdateRequest) {
        PhuongThucBaoHanh entity = phuongThucBaoHanhJPA.findById(phuongThucBHUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Phương thức bảo hành"));
        BaoHanh baoHanh = baoHanhJPA.findById(phuongThucBHUpdateRequest.getBaoHanhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
        phuongThucBHMapper.toPhuongThucBaoHanhUpdate(entity, phuongThucBHUpdateRequest);
        entity.setBaoHanh(baoHanh);
        entity.setNgaySua(LocalDateTime.now());
        return phuongThucBHMapper.toPhuongThucBaoHanhResponse(phuongThucBaoHanhJPA.save(entity));
    }

    public void deletePhuongThuc(Integer id) {
        PhuongThucBaoHanh entity = phuongThucBaoHanhJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Phương thức bảo hành"));
        entity.setNgayXoa(LocalDateTime.now());
        phuongThucBaoHanhJPA.save(entity);
    }

}
