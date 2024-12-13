package com.cusc.toolbaogia.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhCreateRequest;
import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhDeleteRequest;
import com.cusc.toolbaogia.dto.donvitinh.request.DonViTinhUpdateRequest;
import com.cusc.toolbaogia.dto.donvitinh.response.DonViTinhResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.DonViTinhMapper;
import com.cusc.toolbaogia.models.DonViTinh;
import com.cusc.toolbaogia.repositories.DonViTinhJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonViTinhService {
    @Autowired
    DonViTinhJPA donViTinhJPA;
    @Autowired
    DonViTinhMapper donViTinhMapper;

    @Transactional
    public DonViTinhResponse createDonViTinh(DonViTinhCreateRequest request) {
        DonViTinh donViTinh = donViTinhMapper.toDonViTinhCreate(request);
        donViTinh.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        donViTinhJPA.save(donViTinh);
        return donViTinhMapper.toDonViTinhResponse(donViTinh);
    }

    @Transactional
    public DonViTinhResponse updateDonViTinh(DonViTinhUpdateRequest request) {
        DonViTinh donViTinh = donViTinhJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));

        donViTinhMapper.toDonViTinhUpdate(donViTinh, request);
        donViTinh.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        donViTinhJPA.save(donViTinh);
        return donViTinhMapper.toDonViTinhResponse(donViTinh);
    }

    @Transactional
    public void deleteDonViTinhByList(DonViTinhDeleteRequest request) {
        for (Integer id : request.getIds()) {
            DonViTinh donViTinh = donViTinhJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));

            donViTinh.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            donViTinhJPA.save(donViTinh);
        }
    }

    @Transactional
    public void deleteDonViTinhById(int id) {
        DonViTinh donViTinh = donViTinhJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));

        donViTinh.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        donViTinhJPA.save(donViTinh);
    }

    public PageImpl<DonViTinhResponse> getAllDonViTinh(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<DonViTinh> donViTinhPage = donViTinhJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<DonViTinhResponse> responseList = donViTinhPage.getContent().stream()
                .map(donViTinhMapper::toDonViTinhResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, donViTinhPage.getTotalElements());
    }

    public DonViTinhResponse getDonViTinhById(int id) {
        DonViTinh donViTinh = donViTinhJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));
        return donViTinhMapper.toDonViTinhResponse(donViTinh);
    }


}
