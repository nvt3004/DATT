package com.cusc.toolbaogia.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.hangmuc.request.HangMucCreateRequest;
import com.cusc.toolbaogia.dto.hangmuc.request.HangMucDeleteRequest;
import com.cusc.toolbaogia.dto.hangmuc.request.HangMucUpdateRequest;
import com.cusc.toolbaogia.dto.hangmuc.response.HangMucResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.HangMucMapper;
import com.cusc.toolbaogia.models.DonViTinh;
import com.cusc.toolbaogia.models.HangMuc;
import com.cusc.toolbaogia.repositories.DonViTinhJPA;
import com.cusc.toolbaogia.repositories.HangMucJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HangMucService {

    HangMucJPA hangMucJPA;
    DonViTinhJPA donViTinhJPA;
    HangMucMapper hangMucMapper;

    @Transactional
    public HangMucResponse createHangMuc(HangMucCreateRequest hangMucRequest) {
        DonViTinh donViTinh = donViTinhJPA.findById(hangMucRequest.getDonViTinhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));

        HangMuc hangMuc = hangMucMapper.toHangMucFromCreateRequest(hangMucRequest);
        hangMuc.setDonViTinh(donViTinh);
        hangMuc.setMoTa(hangMucRequest.getMoTa());
        hangMuc.setNgayTao(CurrentDateVietnam.getCurrentDateTime());

        return hangMucMapper.toHangMucResponse(hangMucJPA.save(hangMuc));
    }

    @Transactional
    public HangMucResponse updateHangMuc(HangMucUpdateRequest hangMucUpdateRequest) {
        HangMuc hangMuc = hangMucJPA.findById(hangMucUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));

        DonViTinh donViTinh = donViTinhJPA.findById(hangMucUpdateRequest.getDonViTinhId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Đơn vị tính"));

        hangMuc.setDonViTinh(donViTinh);
        hangMuc.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        hangMucMapper.toHangMucFromUpdateRequest(hangMuc, hangMucUpdateRequest);

        return hangMucMapper.toHangMucResponse(hangMucJPA.save(hangMuc));
    }

    @Transactional
    public void deleteHangMucById(int id) {
        HangMuc hangMuc = hangMucJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));

        hangMuc.setNgayXoa(LocalDateTime.now());
        hangMucJPA.save(hangMuc);
    }

    @Transactional
    public void deleteHangMucByList(HangMucDeleteRequest request) {
        for (Integer id : request.getIds()) {
            HangMuc hangMuc = hangMucJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));

            hangMuc.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            hangMucJPA.save(hangMuc);
        }
    }

    public PageImpl<HangMucResponse> getAllHangMuc(int page, int size, String key) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HangMuc> hangMucPage;

        if (key != null) {
            hangMucPage = hangMucJPA.findByNgayXoaIsNullAndTenContainingOrDonViTinh_TenContaining(key, key, pageable);
        } else {
            hangMucPage = hangMucJPA.findAllByNgayXoaIsNull(pageable);
        }

        List<HangMucResponse> responseList = hangMucPage.getContent().stream()
                .map(hangMucMapper::toHangMucResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, hangMucPage.getTotalElements());
    }

    public HangMucResponse getHangMucById(int id) {
        HangMuc hangMuc = hangMucJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Hạng mục"));
        return hangMucMapper.toHangMucResponse(hangMuc);
    }
}
