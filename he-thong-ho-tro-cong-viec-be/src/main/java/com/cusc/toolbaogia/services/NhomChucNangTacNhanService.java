package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.request.NhomChucNangTacNhanUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnangtacnhan.response.NhomChucNangTacNhanResponse;
import com.cusc.toolbaogia.dto.thongso.request.ThongSoDeleteRequest;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.NhomChucNangTacNhanMapper;
import com.cusc.toolbaogia.models.NhomChucNang;
import com.cusc.toolbaogia.models.NhomChucNangTacNhan;
import com.cusc.toolbaogia.models.TacNhan;
import com.cusc.toolbaogia.repositories.NhomChucNangTacNhanJPA;
import com.cusc.toolbaogia.repositories.NhomChucNangJPA;
import com.cusc.toolbaogia.repositories.TacNhanJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NhomChucNangTacNhanService {
    @Autowired
    NhomChucNangTacNhanJPA nhomChucNangTacNhanJPA;
    @Autowired
    NhomChucNangTacNhanMapper chucNangTacNhanMapper;

    @Autowired
    NhomChucNangJPA nhomChucNangJPA;
    @Autowired
    TacNhanJPA tacNhanJPA;

    @Transactional
    public NhomChucNangTacNhanResponse createNhomChucNangTacNhan(NhomChucNangTacNhanCreateRequest request) {
        NhomChucNangTacNhan chucNangTacNhan = chucNangTacNhanMapper.toChucNangTacNhan(request);
        chucNangTacNhan.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangTacNhanJPA.save(chucNangTacNhan);
        return chucNangTacNhanMapper.toChucNangTacNhanResponse(chucNangTacNhan);
    }

    @Transactional
    public NhomChucNangTacNhanResponse updateNhomChucNangTacNhan(NhomChucNangTacNhanUpdateRequest request) {
        NhomChucNangTacNhan chucNangTacNhan = nhomChucNangTacNhanJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng tác nhân"));

        NhomChucNang nhomChucNang = nhomChucNangJPA.findByIdAndNgayXoaIsNull(request.getNhomChucNangId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm Chức năng"));
        chucNangTacNhan.setNhomChucNang(nhomChucNang);

        TacNhan tacNhan = tacNhanJPA.findByIdAndNgayXoaIsNull(request.getTacNhanId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Tác nhân"));
        chucNangTacNhan.setTacNhan(tacNhan);

        chucNangTacNhanMapper.updateChucNangTacNhan(chucNangTacNhan, request);
        chucNangTacNhan.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangTacNhanJPA.save(chucNangTacNhan);
        return chucNangTacNhanMapper.toChucNangTacNhanResponse(chucNangTacNhan);
    }

    @Transactional
    public void deleteNhomChucNangTacNhanByList(ThongSoDeleteRequest request) {
        for (Integer id : request.getIds()) {
            NhomChucNangTacNhan chucNangTacNhan = nhomChucNangTacNhanJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng tác nhân"));
            chucNangTacNhan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            nhomChucNangTacNhanJPA.save(chucNangTacNhan);
        }
    }

    @Transactional
    public void deleteNhomChucNangTacNhanById(int id) {
        NhomChucNangTacNhan chucNangTacNhan = nhomChucNangTacNhanJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng tác nhân"));
        chucNangTacNhan.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangTacNhanJPA.save(chucNangTacNhan);
    }

    public PageImpl<NhomChucNangTacNhanResponse> getAllNhomChucNangTacNhan(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<NhomChucNangTacNhan> chucNangTacNhanPage = nhomChucNangTacNhanJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<NhomChucNangTacNhanResponse> responseList = chucNangTacNhanPage.getContent().stream()
                .map(chucNangTacNhanMapper::toChucNangTacNhanResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(responseList, pageable, chucNangTacNhanPage.getTotalElements());
    }

    public NhomChucNangTacNhanResponse getNhomChucNangTacNhanById(int id) {
        NhomChucNangTacNhan chucNangTacNhan = nhomChucNangTacNhanJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Chức năng tác nhân"));
        return chucNangTacNhanMapper.toChucNangTacNhanResponse(chucNangTacNhan);
    }
}
