package com.cusc.toolbaogia.services;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupCreateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupDeleteRequest;
import com.cusc.toolbaogia.dto.thongsogroup.request.ThongSoGroupUpdateRequest;
import com.cusc.toolbaogia.dto.thongsogroup.response.ThongSoGroupResponse;
import com.cusc.toolbaogia.exception.AppException;
import com.cusc.toolbaogia.exception.ErrorCode;
import com.cusc.toolbaogia.mapper.ThongSoGroupMapper;
import com.cusc.toolbaogia.models.ThongSoGroup;
import com.cusc.toolbaogia.repositories.ThongSoGroupJPA;
import com.cusc.toolbaogia.utils.CurrentDateVietnam;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThongSoGroupService {

    ThongSoGroupJPA thongSoGroupJPA;
    ThongSoGroupMapper thongSoGroupMapper;

    @Transactional
    public ThongSoGroupResponse createThongSoGroup(ThongSoGroupCreateRequest request) {
        ThongSoGroup thongSoGroup = thongSoGroupMapper.toThongSoGroup(request);
        thongSoGroup.setNgayTao(CurrentDateVietnam.getCurrentDateTime());
        thongSoGroupJPA.save(thongSoGroup);
        return thongSoGroupMapper.toThongSoGroupResponse(thongSoGroup);
    }

    @Transactional
    public ThongSoGroupResponse updateThongSoGroup(ThongSoGroupUpdateRequest request) {
        ThongSoGroup thongSoGroup = thongSoGroupJPA.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));

        thongSoGroupMapper.updateThongSoGroup(thongSoGroup, request);
        thongSoGroup.setNgaySua(CurrentDateVietnam.getCurrentDateTime());
        thongSoGroupJPA.save(thongSoGroup);
        return thongSoGroupMapper.toThongSoGroupResponse(thongSoGroup);
    }

    @Transactional
    public void deleteThongSoGroupByList(ThongSoGroupDeleteRequest deleteRequest) {
        for (Integer id : deleteRequest.getIds()) {
            ThongSoGroup thongSoGroup = thongSoGroupJPA.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));

            thongSoGroup.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
            thongSoGroupJPA.save(thongSoGroup);
        }
    }

    @Transactional
    public void deleteThongSoGroupById(int id) {
        ThongSoGroup thongSoGroup = thongSoGroupJPA.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));

        thongSoGroup.setNgayXoa(CurrentDateVietnam.getCurrentDateTime());
        thongSoGroupJPA.save(thongSoGroup);
    }

    public PageImpl<ThongSoGroupResponse> getAllThongSoGroup(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ThongSoGroup> thongSoGroupPage = thongSoGroupJPA.findByNgayXoaIsNullOrderByNgayTaoDesc(pageable);

        List<ThongSoGroupResponse> responseList = thongSoGroupPage.getContent().stream()
                .map(thongSoGroupMapper::toThongSoGroupResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, thongSoGroupPage.getTotalElements());
    }

    public ThongSoGroupResponse getThongSoGroupById(int id) {
        ThongSoGroup thongSoGroup = thongSoGroupJPA.findByIdAndNgayXoaIsNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Nhóm thông số"));
        return thongSoGroupMapper.toThongSoGroupResponse(thongSoGroup);
    }
}
