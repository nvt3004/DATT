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

import com.cusc.toolbaogia.dto.tuvan.request.TuVanCreateRequest;
import com.cusc.toolbaogia.dto.tuvan.request.TuVanUpdateRequest;
import com.cusc.toolbaogia.dto.tuvan.response.TuVanResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.TuVanMapper;
import com.cusc.toolbaogia.models.DanhXung;
import com.cusc.toolbaogia.models.TuVan;
import com.cusc.toolbaogia.repositories.DanhXungJPA;
import com.cusc.toolbaogia.repositories.TuVanJPA;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TuVanService {
    @Autowired
    private TuVanJPA tuVanJPA;

    @Autowired
    private DanhXungJPA danhXungJPA;

    @Autowired
    private TuVanMapper tuVanMapper;

    public PageImpl<TuVanResponse> getAllTuVan(int page, int size, String key, Integer idDanhXung) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Direction.DESC, "id"));
        Page<TuVan> pageTuVan;
        if (idDanhXung != null) {
           danhXungJPA.findById(idDanhXung)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Danh xưng"));
        }
        if (key != null) {
            if (idDanhXung == null) {
                pageTuVan = tuVanJPA.findAllByNgayXoaIsNullAndTenContainingOrEmailContainingOrSoDienThoaiContaining(
                        key, key, key, pageable);
            } else {
                pageTuVan = tuVanJPA
                        .findAllByNgayXoaIsNullAndDanhXungAndTenContainingOrEmailContainingOrSoDienThoaiContaining(
                                danhXungJPA.findById(idDanhXung).get(), key, key, key, pageable);
            }
        } else {
            if (idDanhXung == null) {
                pageTuVan = tuVanJPA.findAllByNgayXoaIsNull(pageable);
            } else {
                pageTuVan = tuVanJPA.findAllByNgayXoaIsNullAndDanhXung(danhXungJPA.findById(idDanhXung).get(),
                        pageable);
            }
        }

        List<TuVanResponse> list = pageTuVan.stream()
                .map(tuvan -> tuVanMapper.toTuVanResponse(tuvan))
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, pageTuVan.getTotalElements());
    }

    public TuVanResponse getTuVan(Integer id) {
        TuVan entity = tuVanJPA.findById(id).orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Tư vấn"));
        return tuVanMapper.toTuVanResponse(entity);
    }

    public TuVanResponse create(TuVanCreateRequest tuVan) {
        DanhXung danhXung = danhXungJPA.findById(tuVan.getDanhXungId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Danh xưng"));
        TuVan entity = tuVanMapper.toTuVanCreate(tuVan);
        entity.setNgayTao(LocalDateTime.now());
        entity.setDanhXung(danhXung);
        return tuVanMapper.toTuVanResponse(tuVanJPA.save(entity));
    }

    public TuVanResponse update(TuVanUpdateRequest tuVan) {
        TuVan entity = tuVanJPA.findById(tuVan.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Tư vấn"));
        DanhXung danhXung = danhXungJPA.findById(tuVan.getDanhXungId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Danh xưng"));
        // entity.setEmail(tuVan.getEmail());
        // entity.setSoDienThoai(tuVan.getSoDienThoai());
        // entity.setTen(tuVan.getTen());
        tuVanMapper.toTuVanUpdate(entity, tuVan);
        entity.setDanhXung(danhXung);
        entity.setNgaySua(LocalDateTime.now());
        return tuVanMapper.toTuVanResponse(tuVanJPA.save(entity));
    }

    public void delete(Integer id) {
        TuVan entity = tuVanJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED,"Tư vấn"));
        entity.setNgayXoa(LocalDateTime.now());
        tuVanJPA.save(entity);
    }
}
