package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhCreateRequest;
import com.cusc.toolbaogia.dto.baohanh.request.BaoHanhUpdateRequest;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanhResponse;
import com.cusc.toolbaogia.dto.baohanh.response.BaoHanh_ChiTietResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.BaoHanhMapper;
import com.cusc.toolbaogia.models.BaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoHanhService {
        @Autowired
        private BaoHanhJPA baoHanhJPA;
        @Autowired
        private BaoHanhMapper boBaoHanhMapper;

        public PageImpl<BaoHanh_ChiTietResponse> getAllBaoHanh(int page, int size) {
                Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
                Page<BaoHanh> baoHanhPage = baoHanhJPA.findAll(pageable);
                List<BaoHanh_ChiTietResponse> list = baoHanhPage.stream()
                                .map(baohanh -> boBaoHanhMapper.tBaoHanh_ChiTietResponse(baohanh))
                                .collect(Collectors.toList());
                return new PageImpl<>(list, pageable, baoHanhPage.getTotalElements());
        }

        public BaoHanh_ChiTietResponse getBaoHanh(Integer id) {
                BaoHanh baoHanh = baoHanhJPA.findById(id).orElseThrow(
                                () -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                return boBaoHanhMapper.tBaoHanh_ChiTietResponse(baoHanh);
        }

        public BaoHanhResponse postBaoHanh(BaoHanhCreateRequest baohanh) {
                BaoHanh entity = boBaoHanhMapper.toBaoHanhCreate(baohanh);
                entity.setNgayTao(LocalDateTime.now());
                return boBaoHanhMapper.tBaoHanh2Response(baoHanhJPA.save(entity));
        }

        public BaoHanhResponse putBaoHanh(BaoHanhUpdateRequest baohanh) {
                BaoHanh entity = baoHanhJPA.findById(baohanh.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                boBaoHanhMapper.toBaoHanhUpdate(entity, baohanh);
                entity.setNgaySua(LocalDateTime.now());
                return boBaoHanhMapper.tBaoHanh2Response(baoHanhJPA.save(entity));
        }

        public void delete(Integer id) {
                BaoHanh baoHanh = baoHanhJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                baoHanh.setNgayXoa(LocalDateTime.now());
                baoHanhJPA.save(baoHanh);
        }
}
