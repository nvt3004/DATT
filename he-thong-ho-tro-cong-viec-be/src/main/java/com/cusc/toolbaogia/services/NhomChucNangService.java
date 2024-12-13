package com.cusc.toolbaogia.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangCreateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangDeleteRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.request.NhomChucNangUpdateRequest;
import com.cusc.toolbaogia.dto.nhomchucnang.response.NhomChucNangResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.NhomChucNangMapper;
import com.cusc.toolbaogia.models.ChucNang;
import com.cusc.toolbaogia.models.HangMuc;
import com.cusc.toolbaogia.models.NhomChucNang;
import com.cusc.toolbaogia.repositories.HangMucJPA;
import com.cusc.toolbaogia.repositories.NhomChucNangJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

@Service
public class NhomChucNangService {

    @Autowired
    private NhomChucNangJPA nhomChucNangJPA;

    @Autowired
    private NhomChucNangMapper nhomChucNangMapper;

    @Autowired
    private HangMucJPA hangMucJPA;

    LocalDateTime dateNow = CurrentDateVietnam.getCurrentDateTime();

    @Transactional
    public NhomChucNangResponse createNhomChucNang(NhomChucNangCreateRequest request) {
        NhomChucNang nhomChucNang = nhomChucNangMapper.toNhomChucNang(request);
        nhomChucNang.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangJPA.save(nhomChucNang);
        return nhomChucNangMapper.toNhomChucNangResponse(nhomChucNang);
    }

    @Transactional
    public NhomChucNangResponse updateNhomChucNang(NhomChucNangUpdateRequest request) {
        NhomChucNang nhomChucNang = nhomChucNangJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));
        HangMuc hangMuc = hangMucJPA.findById(request.getHangMucId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));
        nhomChucNang.setHangMuc(hangMuc);
        nhomChucNangMapper.updateNhomChucNang(nhomChucNang, request);
        nhomChucNang.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangJPA.save(nhomChucNang);
        return nhomChucNangMapper.toNhomChucNangResponse(nhomChucNang);
    }

    @Transactional
    public void deleteNhomChucNangByList(NhomChucNangDeleteRequest request) {
        for (Integer id : request.getIds()) {
            NhomChucNang nhomChucNang = nhomChucNangJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));
            nhomChucNang.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            nhomChucNangJPA.save(nhomChucNang);
        }
    }

    @Transactional
    public void deleteNhomChucNangById(int id) {
        NhomChucNang nhomChucNang = nhomChucNangJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));
        nhomChucNang.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        nhomChucNangJPA.save(nhomChucNang);
    }

    public PageImpl<NhomChucNangResponse> getAllNhomChucNang(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<NhomChucNang> nhomChucNangPage = nhomChucNangJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);
        List<NhomChucNangResponse> responseList = nhomChucNangPage.getContent().stream()
                .map(nhomChucNangMapper::toNhomChucNangResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(responseList, pageable, nhomChucNangPage.getTotalElements());
    }

    public NhomChucNangResponse getNhomChucNangById(int id) {
        NhomChucNang nhomChucNang = nhomChucNangJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm chức năng"));

        List<ChucNang> chucNangChuaXoa = nhomChucNang.getListChucNang()
                .stream()
                .filter(chucNang -> chucNang.getNgayXoa() == null)
                .collect(Collectors.toList());

        nhomChucNang.setListChucNang(chucNangChuaXoa);
        return nhomChucNangMapper.toNhomChucNangResponse(nhomChucNang);
    }
}
