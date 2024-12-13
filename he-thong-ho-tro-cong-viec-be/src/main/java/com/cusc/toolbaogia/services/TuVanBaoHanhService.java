package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.tuvanbaohanh.request.TuVanBaoHanhCreateRequest;
import com.cusc.toolbaogia.dto.tuvanbaohanh.request.TuVanBaoHanhUpdateRequest;
import com.cusc.toolbaogia.dto.tuvanbaohanh.response.TuVanBaoHanhResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.TuVanBaoHanhMapper;
import com.cusc.toolbaogia.models.BaoHanhBaoGia;
import com.cusc.toolbaogia.models.TuVan;
import com.cusc.toolbaogia.models.TuVanBaoHanh;
import com.cusc.toolbaogia.repositories.BaoHanhBaoGiaJPA;
import com.cusc.toolbaogia.repositories.TuVanBaoHanhJPA;
import com.cusc.toolbaogia.repositories.TuVanJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TuVanBaoHanhService {
        @Autowired
        TuVanJPA tuVanJPA;
        @Autowired
        BaoHanhBaoGiaJPA baoHanhBaoGiaJPA;
        @Autowired
        TuVanBaoHanhMapper tuVanBaoHanhMapper;
        @Autowired
        TuVanBaoHanhJPA tuVanBaoHanhJPA;

        public PageImpl<TuVanBaoHanhResponse> getAll(int page, int size) {
                Pageable pageable = PageRequest.of(page - 1, size);
                Page<TuVanBaoHanh> pageTuVan = tuVanBaoHanhJPA.findAllByNgayXoaIsNull(pageable);
                List<TuVanBaoHanhResponse> list = pageTuVan.stream()
                                .map(tuvanbaohanh -> tuVanBaoHanhMapper.toTuVanBaoHanhResponse(tuvanbaohanh))
                                .collect(Collectors.toList());
                return new PageImpl<>(list, pageable, pageTuVan.getTotalElements());
        }

        public TuVanBaoHanhResponse getId(Integer id) {
                TuVanBaoHanh entity = tuVanBaoHanhJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tư vấn bảo hành"));
                return tuVanBaoHanhMapper.toTuVanBaoHanhResponse(entity);
        }

        public List<TuVanBaoHanhResponse> create(TuVanBaoHanhCreateRequest tuVanBaoHanhCreateRequest) {
                BaoHanhBaoGia baoHanhBaoGia = baoHanhBaoGiaJPA.findById(tuVanBaoHanhCreateRequest.getBaoHanhBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành báo giá"));
                List<TuVanBaoHanhResponse> list = new ArrayList<>();
                tuVanBaoHanhCreateRequest.getTuVanId().forEach(tuvan -> {
                        TuVan tuVan = tuVanJPA.findById(tuvan)
                                        .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tư vấn"));
                        TuVanBaoHanh entity = new TuVanBaoHanh();
                        entity.setBaoHanhBaoGia(baoHanhBaoGia);
                        entity.setTuVan(tuVan);
                        entity.setNgayTao(LocalDateTime.now());
                        list.add(tuVanBaoHanhMapper.toTuVanBaoHanhResponse(tuVanBaoHanhJPA.save(entity)));
                });

                return list;
        }

        public TuVanBaoHanhResponse update(TuVanBaoHanhUpdateRequest tuVanBaoHanhUpdateRequest) {
                TuVan tuVan = tuVanJPA.findById(tuVanBaoHanhUpdateRequest.getTuVanId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tư vấn"));
                BaoHanhBaoGia baoHanhBaoGia = baoHanhBaoGiaJPA.findById(tuVanBaoHanhUpdateRequest.getBaoHanhBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành báo giá"));
                TuVanBaoHanh entity = tuVanBaoHanhJPA.findById(tuVanBaoHanhUpdateRequest.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tư vấn bảo hành"));
                entity.setBaoHanhBaoGia(baoHanhBaoGia);
                entity.setTuVan(tuVan);
                entity.setNgaySua(LocalDateTime.now());
                return tuVanBaoHanhMapper.toTuVanBaoHanhResponse(tuVanBaoHanhJPA.save(entity));
        }

        public void delete(Integer id) {
                TuVanBaoHanh entity = tuVanBaoHanhJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tư vấn bảo hành"));
                entity.setNgayXoa(LocalDateTime.now());
                tuVanBaoHanhJPA.save(entity);
        }

}
