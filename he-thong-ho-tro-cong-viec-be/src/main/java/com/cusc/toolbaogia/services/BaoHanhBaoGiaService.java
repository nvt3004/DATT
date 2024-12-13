package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.cusc.toolbaogia.exception.ErrorCode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaCreateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.request.BaoHanhBaoGiaUpdateRequest;
import com.cusc.toolbaogia.dto.baohanhbaogia.response.BaoHanhBaoGiaResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.mapper.BaoHanhBaoGiaMapper;
import com.cusc.toolbaogia.models.BaoGia;
import com.cusc.toolbaogia.models.BaoHanh;
import com.cusc.toolbaogia.models.BaoHanhBaoGia;
import com.cusc.toolbaogia.models.ThoiGian;
import com.cusc.toolbaogia.repositories.BaoGiaJPA;
import com.cusc.toolbaogia.repositories.BaoHanhBaoGiaJPA;
import com.cusc.toolbaogia.repositories.BaoHanhJPA;
import com.cusc.toolbaogia.repositories.ThoigianJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaoHanhBaoGiaService {
        @Autowired
        BaoHanhBaoGiaJPA baoHanhBaoGiaJPA;
        @Autowired
        BaoHanhBaoGiaMapper baoHanhBaoGiaMapper;
        @Autowired
        BaoHanhJPA baoHanhJPA;
        @Autowired
        BaoGiaJPA baoGiaJPA;
        @Autowired
        ThoigianJPA thoigianJPA;

        public PageImpl<BaoHanhBaoGiaResponse> getAll(int page, int size) {
                Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
                Page<BaoHanhBaoGia> pageBaoHanhBaoGia = baoHanhBaoGiaJPA.findAllByNgayXoaIsNull(pageable);
                List<BaoHanhBaoGiaResponse> list = pageBaoHanhBaoGia.stream()
                                .map(baoHanhBaoGiaMapper::tBaoGiaResponse)
                                .collect(Collectors.toList());
                return new PageImpl<>(list, pageable, pageBaoHanhBaoGia.getTotalElements());
        }

        public BaoHanhBaoGiaResponse getId(Integer id) {
                BaoHanhBaoGia entity = baoHanhBaoGiaJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành báo giá"));
                return baoHanhBaoGiaMapper.tBaoGiaResponse(entity);
        }

        public BaoHanhBaoGiaResponse create(BaoHanhBaoGiaCreateRequest baoHanhBaoGiaCreateRequest) {
                BaoHanh baoHanh = baoHanhJPA.findById(baoHanhBaoGiaCreateRequest.getBaoHanhId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                BaoGia baoGia = baoGiaJPA.findById(baoHanhBaoGiaCreateRequest.getBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
                ThoiGian thoiGian = thoigianJPA.findById(baoHanhBaoGiaCreateRequest.getThoiGianId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
                BaoHanhBaoGia entity = baoHanhBaoGiaMapper.toBaoHanhBaoGiaCreate(baoHanhBaoGiaCreateRequest);
                entity.setBaoGia(baoGia);
                entity.setBaoHanh(baoHanh);
                entity.setThoiGian(thoiGian);
                entity.setNgayTao(LocalDateTime.now());
                return baoHanhBaoGiaMapper.tBaoGiaResponse(baoHanhBaoGiaJPA.save(entity));
        }

        public BaoHanhBaoGiaResponse update(BaoHanhBaoGiaUpdateRequest baoGiaUpdateRequest) {
                BaoHanhBaoGia entity = baoHanhBaoGiaJPA.findById(baoGiaUpdateRequest.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành báo giá"));
                BaoHanh baoHanh = baoHanhJPA.findById(baoGiaUpdateRequest.getBaoHanhId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành"));
                BaoGia baoGia = baoGiaJPA.findById(baoGiaUpdateRequest.getBaoGiaId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Báo giá"));
                ThoiGian thoiGian = thoigianJPA.findById(baoGiaUpdateRequest.getThoiGianId())
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Thời gian"));
                baoHanhBaoGiaMapper.toBaoHanhBaoGiaUpdate(entity, baoGiaUpdateRequest);
                entity.setBaoGia(baoGia);
                entity.setBaoHanh(baoHanh);
                entity.setThoiGian(thoiGian);
                entity.setNgaySua(LocalDateTime.now());
                return baoHanhBaoGiaMapper.tBaoGiaResponse(baoHanhBaoGiaJPA.save(entity));
        }

        public void delete(Integer id) {
                BaoHanhBaoGia entity = baoHanhBaoGiaJPA.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Bảo hành báo giá"));
                entity.setNgayXoa(LocalDateTime.now());
                baoHanhBaoGiaJPA.save(entity);
        }
}
